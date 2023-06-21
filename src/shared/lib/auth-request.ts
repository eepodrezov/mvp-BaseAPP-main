import { AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse } from 'axios'
import { CLIENT_ID, CLIENT_SECRET } from '../config'
import { httpClient } from './http-client'

export const GRANT_TYPE_PASSWORD = 'password'

export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token'

export const AUTH_REQUEST_TARGET = '/token'
export interface ResponseAuth {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export async function authRequest(
  config: AxiosRequestConfig<AxiosBasicCredentials>
): Promise<AxiosResponse<ResponseAuth, FormData>>
export async function authRequest(refresh_token: string): Promise<AxiosResponse<ResponseAuth, FormData>>
export async function authRequest(
  arg: AxiosRequestConfig<AxiosBasicCredentials> | string
): Promise<AxiosResponse<ResponseAuth, FormData>> {
  const formData = new FormData()
  if (typeof arg === 'string') {
    formData.append('grant_type', GRANT_TYPE_REFRESH_TOKEN)
    formData.append('refresh_token', arg)
  } else {
    arg.data?.username && formData.append('username', arg.data.username)
    arg.data?.password && formData.append('password', arg.data.password)
    formData.append('grant_type', GRANT_TYPE_PASSWORD)
  }
  formData.append('client_id', CLIENT_ID)
  formData.append('client_secret', CLIENT_SECRET)
  return httpClient<ResponseAuth, FormData>({
    url: AUTH_REQUEST_TARGET,
    method: 'POST',
    data: formData,
  })
}
