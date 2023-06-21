import { notify } from '@/shared/lib'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { TFunction } from 'next-i18next'
import { UseMutationOptions, useMutation } from 'react-query'
import { Car, CAR_FAVORITE_ADD, FAVORITES_PRIMARY_KEY, ResponseFavoriteReq, serverSideValidationFavorite } from '../lib'
import { queryFetchFavorites } from './car-requests'

export const useFavoritesRequest = (
  t: TFunction,
  options?: Omit<UseMutationOptions<ResponseFavoriteReq, AxiosError, Pick<Car, 'id'>>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ id }) => queryFetchFavorites(id)(config)(), {
    ...options,
    mutationKey: FAVORITES_PRIMARY_KEY,
    onSuccess: ({ message }) => {
      notify(message === CAR_FAVORITE_ADD ? t('car:addFavoriteSuccess') : t('car:removeFavoriteSuccess'))
    },
    onError: error => serverSideValidationFavorite(t, error),
  })
