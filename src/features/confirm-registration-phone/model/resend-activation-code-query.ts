import { RESEND_ACTIVATION_CODE_PRIMARY_KEY } from '../lib'
import { RequestConfirmCodeTypes } from '@/features'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { queryFetchResendActivationCode } from './resend-activation-code-request'

export const useResendActivationCode = (
  options?: Omit<UseMutationOptions<RequestConfirmCodeTypes, AxiosError, RequestConfirmCodeTypes>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(
    ({ email, phone, code, newPassword, isRepeat }) =>
      queryFetchResendActivationCode(email, phone, code, newPassword, isRepeat)(config)(),
    {
      ...options,
      mutationKey: RESEND_ACTIVATION_CODE_PRIMARY_KEY,
    }
  )
