import { CONFIRM_CODE_PRIMARY_KEY } from '../lib'
import { RequestConfirmCodeTypes } from '@/features'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { queryFetchConfirmCode } from './confirm-code-request'

export const useConfirmCode = (
  options?: Omit<UseMutationOptions<RequestConfirmCodeTypes, AxiosError, RequestConfirmCodeTypes>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ code, phone, email, isRepeat }) => queryFetchConfirmCode(code, phone, email, isRepeat)(config)(), {
    ...options,
    mutationKey: CONFIRM_CODE_PRIMARY_KEY,
  })
