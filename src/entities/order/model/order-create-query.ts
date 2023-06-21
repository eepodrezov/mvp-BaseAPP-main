import { AxiosError, AxiosRequestConfig } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { Order, ORDER_CREATE_PRIMARY_KEY } from '../lib'
import { queryCreateOrder } from './order-requests'

export const useCreateOrder = (
  options?: Omit<UseMutationOptions<Order, AxiosError, number>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(carId => queryCreateOrder(carId)(config)(), {
    ...options,
    mutationKey: ORDER_CREATE_PRIMARY_KEY,
  })
