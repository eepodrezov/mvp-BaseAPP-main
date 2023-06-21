import { InfiniteQueryParams, queryFactory } from '@/shared/lib'
import { BaseEntity, CollectionResponse } from '@/shared/@types'
import {
  CarStockItem,
  STOCK_COLLECTION_PRIMARY_KEY,
  STOCK_SINGLE_DELETE_PRIMARY_KEY,
  STOCK_SINGLE_UPDATE_PRIMARY_KEY,
} from '../lib'
import { queryFetchStockCollection, queryFetchStockDelete, queryFetchStockUpdateVisible } from './stock-request'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'

const stockCollectionQuery = queryFactory(
  STOCK_COLLECTION_PRIMARY_KEY,
  queryFetchStockCollection,
  {
    itemsPerPage: 10,
    'order[id]': 'desc',
    blocked: false,
  },
  'infinite'
)(filters => ({
  params: filters,
}))

export const useStockCollection = (params?: InfiniteQueryParams<CollectionResponse<CarStockItem>>) =>
  stockCollectionQuery.useHookInitializer({}, params)

export const useStockDeleteRequest = (
  options?: Omit<UseMutationOptions<CarStockItem, AxiosError, Pick<BaseEntity, 'id'>>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ id }) => queryFetchStockDelete(id)(config)(), {
    ...options,
    mutationKey: STOCK_SINGLE_DELETE_PRIMARY_KEY,
  })

export const useStockUpdateVisibleRequest = (
  options?: Omit<UseMutationOptions<CarStockItem, AxiosError, Pick<BaseEntity, 'id'>>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ id }) => queryFetchStockUpdateVisible(id)(config)(), {
    ...options,
    mutationKey: STOCK_SINGLE_UPDATE_PRIMARY_KEY,
  })
