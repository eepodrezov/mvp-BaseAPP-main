import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { BASE_URL, TOKEN_PATH } from '@/shared/config'
import { authRequest, ResponseAuth } from './auth-request'
import _ from 'lodash'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Nullable } from '../@types'

interface Context {
  ctx?: ContextRequest
}
interface Request {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
  config: AxiosRequestConfig & Context
  error?: AxiosError<any>
}

type ContextRequest = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>

type ConfigRequest<D = undefined> = AxiosRequestConfig<D> & Context

let isRefreshing = false
let requestQueue: Request[] = []
let requestCurrent: Nullable<Request> = null

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(requestInterceptor)

instance.interceptors.response.use(config => config, responseInterceptor)

export const getTokens = (ctx?: ContextRequest) => {
  const { access_token, refresh_token } = parseCookies(ctx)
  return { access_token, refresh_token }
}

export const setCookieTokens = (data: ResponseAuth) => {
  setCookie(null, 'access_token', data.access_token, { path: '/', maxAge: data.expires_in })
  setCookie(null, 'refresh_token', data.refresh_token, { path: '/', maxAge: 2592000 })
}

const DEFAULT_AXIOS_HEADERS = {
  Accept: 'application/json',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}

const clearRequests = () => [(requestQueue = []), (requestCurrent = null)]

const requestTokens = _.debounce(
  (refresh_token: string) =>
    authRequest(refresh_token)
      .then(res => setCookieTokens(res.data))
      .then(() => {
        isRefreshing = false
        Promise.allSettled(
          requestQueue.map(({ config, reject, resolve }) => httpClient(config).then(resolve).catch(reject))
        )
        clearRequests()
      }),
  300
)

async function responseInterceptor(error: AxiosError<any>) {
  const refresh_token = getTokens()?.refresh_token

  if (error.response?.status === 401 && refresh_token) {
    destroyCookie(null, 'access_token', { path: '/' })

    if (error.config.url === '/users/current')
      new Promise((resolve, reject) => (requestCurrent = { resolve, reject, config: error.config, error }))

    if (error.response?.data?.message === 'The refresh token is invalid.') {
      destroyCookie(null, 'refresh_token', { path: '/' })
      requestCurrent?.reject(requestCurrent?.error)
      clearRequests()

      return
    }

    isRefreshing = true

    await requestTokens(refresh_token)

    return new Promise((resolve, reject) => requestQueue.push({ resolve, reject, config: error.config }))
  }

  return Promise.reject(error)
}

async function requestInterceptor(config: ConfigRequest) {
  const access_token = getTokens(config.ctx)?.access_token

  config.headers = {
    ...DEFAULT_AXIOS_HEADERS,
    ...config.headers,
  }

  if (isRefreshing && !config.url?.includes(TOKEN_PATH))
    return new Promise((resolve, reject) => requestQueue.push({ resolve, reject, config }))

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
}

export const httpClient = <T, D = undefined>(config: ConfigRequest<D>): Promise<AxiosResponse<T, D>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance(config)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
