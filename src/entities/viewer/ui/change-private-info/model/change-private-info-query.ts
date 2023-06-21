import { queryFetchChangePrivateInfo } from './change-private-info-request'
import { useMutation, UseMutationOptions } from 'react-query'
import { User, CURRENT_VIEWER_PRIVATE_INFO_PRIMARY_KEY } from '@/entities/viewer'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { RequestChangePrivateInfo } from '../lib'

export const useChangePrivateInfo = (
  options?: Omit<UseMutationOptions<User, AxiosError, RequestChangePrivateInfo>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(
    ({ id, email, phone, telegram, isRepeat }) =>
      queryFetchChangePrivateInfo(id, email, phone, telegram, isRepeat)(config)(),
    {
      ...options,
      mutationKey: CURRENT_VIEWER_PRIVATE_INFO_PRIMARY_KEY,
    }
  )
