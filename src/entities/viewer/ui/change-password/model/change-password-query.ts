import { RequestChangePassword } from '../lib'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { queryFetchChangePassword } from './change-password-request'
import { CURRENT_VIEWER_CHANGE_PASSWORD_PRIMARY_KEY, User } from '@/entities/viewer'

export const useChangePassword = (
  options?: Omit<UseMutationOptions<User, AxiosError, RequestChangePassword>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(
    ({ id, oldPassword, repeatPassword, newPassword }) =>
      queryFetchChangePassword(id, oldPassword, newPassword, repeatPassword)(config)(),
    {
      ...options,
      mutationKey: CURRENT_VIEWER_CHANGE_PASSWORD_PRIMARY_KEY,
    }
  )
