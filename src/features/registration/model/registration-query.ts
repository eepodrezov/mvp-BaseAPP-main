import { RequestRegistrationTypes } from '../lib'
import { queryFetchRegistration } from '@/features'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { User, USER_CREATE_PRIMARY_KEY } from '@/entities/viewer'

export const useRegistration = (
  options?: Omit<UseMutationOptions<User, AxiosError, RequestRegistrationTypes>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(data => queryFetchRegistration(data)(config)(), {
    ...options,
    mutationKey: USER_CREATE_PRIMARY_KEY,
  })
