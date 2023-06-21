import { queryFetchFactory, getSingleRequestTarget } from '@/shared/lib'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { Prices, PRICES_SINGLE_REQUEST_TARGET, PRICES_SINGLE_PRIMARY_KEY } from '../lib'

export const queryFetchStockUpdatePrice = (carId: number, value: number) =>
  queryFetchFactory<Prices>(getSingleRequestTarget(carId, PRICES_SINGLE_REQUEST_TARGET), {
    data: { value },
    method: 'PUT',
  })

export const useStockUpdatePriceRequest = (
  options?: Omit<UseMutationOptions<Prices, AxiosError, Pick<Prices, 'id' | 'value'>>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ id, value }) => queryFetchStockUpdatePrice(id, value)(config)(), {
    ...options,
    mutationKey: PRICES_SINGLE_PRIMARY_KEY,
  })
