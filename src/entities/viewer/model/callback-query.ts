import { CURRENT_VIEWER_CALLBACK_PRIMARY_KEY, RequestCallback, User } from '@/entities/viewer'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { queryFetchCallback } from './callback-request'

export const useCallbackRequest = (
  options?: Omit<UseMutationOptions<User, AxiosError, RequestCallback>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ phone, currentLink, comment }) => queryFetchCallback(phone, currentLink, comment)(config)(), {
    ...options,
    mutationKey: CURRENT_VIEWER_CALLBACK_PRIMARY_KEY,
  })
