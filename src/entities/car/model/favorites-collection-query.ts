import { InfiniteQueryParams, queryFactory } from '@/shared/lib'
import { CollectionResponse } from '@/shared/@types'
import { FAVORITES_COLLECTION_PRIMARY_KEY, FavoriteCar } from '../lib'
import { queryFetchFavoritesCollection } from './favorites-request'

const favoritesCollectionQuery = queryFactory(
  FAVORITES_COLLECTION_PRIMARY_KEY,
  queryFetchFavoritesCollection,
  {
    itemsPerPage: 10,
    'order[id]': 'desc',
  },
  'infinite'
)(filters => ({
  params: filters,
}))

export const useFavoritesCollection = (params?: InfiniteQueryParams<CollectionResponse<FavoriteCar>>) =>
  favoritesCollectionQuery.useHookInitializer({}, params)
