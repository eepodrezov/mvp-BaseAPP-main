import { AxiosError, AxiosRequestConfig } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ORDERS_CALLBACK_PRIMARY_KEY } from '../lib'
import { queryOrderCallback } from './order-requests'

export const useOrderCallback = (
  options?: Omit<UseMutationOptions<{ message: string }, AxiosError, number>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(orderId => queryOrderCallback(orderId)(config)(), {
    ...options,
    mutationKey: ORDERS_CALLBACK_PRIMARY_KEY,
  })
