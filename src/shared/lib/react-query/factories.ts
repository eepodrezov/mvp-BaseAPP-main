import { AxiosError, AxiosRequestConfig } from 'axios'
import { merge } from 'lodash'
import {
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { httpClient } from '@/shared/lib'
import { getBetweenFilterValue } from '@/shared/helpers'
import { ParsedUrlQuery } from 'querystring'
import { CollectionResponse } from '@/shared/@types'
import { GetServerSidePropsContext, PreviewData } from 'next'

export type CustomQueryKey = unknown[]

export type QueryType = 'query' | 'infinite'

export type getNextPageParam = (lastPage: CollectionResponse<Response>, allPages: Response[]) => number | boolean

export type QueryFetchFunction<Response> = (
  config?: AxiosRequestConfig | undefined,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => QueryFunction<Response, CustomQueryKey>

export type QueryParams<Response> = Omit<
  UseQueryOptions<Response, AxiosError, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
>

export type InfiniteQueryParams<Response> = Omit<
  UseInfiniteQueryOptions<Response, AxiosError, Response, Response, CustomQueryKey>,
  'queryKey' | 'queryFn' | ('getNextPageParam' & { getNextPageParam: getNextPageParam })
>

export const getSingleRequestTarget = (id: number | string, target: string): string =>
  // eslint-disable-next-line
  target.replace(/\:id/, String(id))

export const queryFetchFactory =
  <Response, RequestData = undefined>(url: string, defaultConfig: AxiosRequestConfig = {}) =>
  (config?: AxiosRequestConfig, ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) =>
  async (context?: QueryFunctionContext) => {
    if (context?.pageParam && config) {
      const { pageParam: page } = context
      if (config.params) config.params.page = page
      else config.params = { page }
    }
    const { data } = await httpClient<Response, RequestData>(merge({ url, ctx }, defaultConfig, config))
    return data
  }

export type QueryFactoryReturnValue<
  Response,
  FiltersContent,
  PrefetchResult extends Response | InfiniteData<Response>,
  Params extends QueryParams<Response> | InfiniteQueryParams<Response>,
  QueryResult extends UseQueryResult | UseInfiniteQueryResult
> = (config?: (filters: FiltersContent & { locale?: string }) => AxiosRequestConfig) => {
  prefetch: (
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    queryClient: QueryClient,
    preBuildFilters?: ParsedUrlQuery,
    params?: Params
  ) => Promise<{
    response?: PrefetchResult
    currentQueryKey: CustomQueryKey
  }>
  useHookInitializer: (
    currentFitlers?: Partial<FiltersContent & { locale: string }>,
    params?: Params
  ) => QueryResult & { currentQueryKey: CustomQueryKey }
}

export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters?: FiltersContent,
  type?: 'query'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  Response,
  QueryParams<Response>,
  UseQueryResult<Response, AxiosError>
>
export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters?: FiltersContent,
  type?: 'infinite'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  InfiniteData<Response>,
  Omit<InfiniteQueryParams<Response>, 'getNextPageParam'>,
  UseInfiniteQueryResult<Response & { getNextPageParam: getNextPageParam }, AxiosError>
>
export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters: FiltersContent = {} as FiltersContent,
  type: QueryType = 'query'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  Response | InfiniteData<Response>,
  QueryParams<Response> | Omit<InfiniteQueryParams<Response>, 'getNextPageParam'>,
  | UseQueryResult<Response, AxiosError>
  | UseInfiniteQueryResult<Response & { getNextPageParam: getNextPageParam }, AxiosError>
> {
  return config => {
    let serverSideFilters: CustomQueryKey
    return {
      prefetch: async (ctx, queryClient, preBuildFilters = {}, params) => {
        // Сделано под Symphony backend
        let filtersKey: keyof typeof preBuildFilters
        for (filtersKey in preBuildFilters) {
          const value = preBuildFilters[filtersKey] as string
          if (value) {
            // eslint-disable-next-line
            if (/\[\d+\,\d+\]/.test(value)) {
              preBuildFilters[filtersKey] = getBetweenFilterValue(JSON.parse(value)) as string
              continue
            }
            // eslint-disable-next-line
            if (/\[[\d+\,?]*\]/.test(value)) {
              preBuildFilters[filtersKey] = JSON.parse(value)
            }
          }
        }

        const filters = { ...initialFilters, ...preBuildFilters }

        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key = [...primaryKey, Object.entries(filters).join()] as CustomQueryKey

        // useHydrate не работает на atomWithUrlLocation, так что нужно на server side передавать initial filters через замыкание
        serverSideFilters = key

        if (type === 'query') {
          await queryClient.prefetchQuery(key, fetch(config?.(filters) || {}, ctx), params as QueryParams<Response>)
        } else {
          await queryClient.prefetchInfiniteQuery(
            key,
            context => fetch(config?.(filters) || {}, ctx)?.(context),
            params as InfiniteQueryParams<Response>
          )
        }
        return {
          response: queryClient.getQueryData<Response | InfiniteData<Response>>(key),
          currentQueryKey: key,
        }
      },
      useHookInitializer: (currentFitlers, params = {}) => {
        const filters = { ...initialFilters, ...currentFitlers }

        // TODO: Нужно протестить, что ключ такого формата не ломает логику react-query
        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key = serverSideFilters || ([...primaryKey, Object.entries(filters).join()] as CustomQueryKey)

        let response

        if (type === 'query') {
          // eslint-disable-next-line
          response = useQuery(key, fetch(config?.(filters) || {}), params as QueryParams<Response>)
        } else {
          // eslint-disable-next-line
          response = useInfiniteQuery(
            key,
            context => fetch(config?.(filters) || {})?.(context),
            //TODO:FIX TYPE
            //@ts-expect-error
            (params = {
              ...params,
              getNextPageParam: (lastPage, allPages) =>
                lastPage.countOfPages > allPages.length ? allPages.length + 1 : false,
            } as Omit<InfiniteQueryParams<Response>, 'getNextPageParam'> & {
              getNextPageParam: getNextPageParam
            })
          )
        }

        return {
          ...(response as
            | UseQueryResult<Response, AxiosError>
            | UseInfiniteQueryResult<Response & { getNextPageParam: getNextPageParam }, AxiosError>),
          currentQueryKey: key,
        }
      },
    }
  }
}
