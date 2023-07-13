import { PASSWORD_RECOVERY_PRIMARY_KEY, PasswordRecoveryPasswordsForm, PasswordRecoveryUsernameForm } from '../lib'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { queryFetchPasswordRecoveryPasswords, queryFetchPasswordRecoveryUsername } from './password-recovery-request'
import { CURRRENT_VIEWER_RESET_PASSWORD_PRIMARY_KEY } from '@/entities/viewer'

export const usePasswordRecoveryUsername = (
  options?: Omit<UseMutationOptions<{ message: string }, AxiosError, PasswordRecoveryUsernameForm>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ username }) => queryFetchPasswordRecoveryUsername(username)(config)(), {
    ...options,
    mutationKey: PASSWORD_RECOVERY_PRIMARY_KEY,
  })

export const usePasswordRecoveryPasswords = (
  options?: Omit<UseMutationOptions<{}, AxiosError, PasswordRecoveryPasswordsForm>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(
    ({ newPassword, repeatPassword, code, phone, email }) =>
      queryFetchPasswordRecoveryPasswords(newPassword, repeatPassword, code, email, phone)(config)(),
    {
      ...options,
      mutationKey: CURRRENT_VIEWER_RESET_PASSWORD_PRIMARY_KEY,
    }
  )
