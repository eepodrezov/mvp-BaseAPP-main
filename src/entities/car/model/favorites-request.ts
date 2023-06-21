import { CollectionResponse } from '@/shared/@types'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import { FavoriteCar, FAVORITES_COLLECTION_REQUEST_TARGET, FAVORITE_SINGLE_REQUEST_TARGET } from '../lib'

export const queryFetchFavoritesCollection = queryFetchFactory<CollectionResponse<FavoriteCar>>(
  FAVORITES_COLLECTION_REQUEST_TARGET
)

export const queryFetchFavorite = (favoriteCarId: number) =>
  queryFetchFactory<FavoriteCar>(getSingleRequestTarget(favoriteCarId, FAVORITE_SINGLE_REQUEST_TARGET))
