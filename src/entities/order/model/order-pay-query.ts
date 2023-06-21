import { AxiosError, AxiosRequestConfig } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ORDER_PAY_PRIMARY_KEY, Payment } from '../lib'
import { queryPayOrder } from './order-requests'

export const usePayOrder = (
  options?: Omit<UseMutationOptions<Payment, AxiosError, number>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(orderId => queryPayOrder(orderId)(config)(), {
    ...options,
    mutationKey: ORDER_PAY_PRIMARY_KEY,
  })
