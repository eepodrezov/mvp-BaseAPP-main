import { AxiosRequestConfig } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ORDER_CREATE_PRIMARY_KEY } from '../lib'
import { queryFetchDeleteOrder } from './order-requests'

export const useDeleteOrder = (
  options?: Omit<UseMutationOptions<{}, unknown, number>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(carId => queryFetchDeleteOrder(carId)(config)(), {
    ...options,
    mutationKey: ORDER_CREATE_PRIMARY_KEY,
  })
