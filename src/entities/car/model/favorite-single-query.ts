import { FAVORITE_SINGLE_PRIMARY_KEY, FavoriteCar } from '../lib'
import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchFavorite } from './favorites-request'

const favoriteCollectionQuery = (favoriteCarId: number) =>
  queryFactory([...FAVORITE_SINGLE_PRIMARY_KEY, favoriteCarId], queryFetchFavorite(favoriteCarId))()

export const useGetFavorite = (favoriteCarId: number, params?: QueryParams<FavoriteCar>) => {
  const { locale } = useRouter()

  return favoriteCollectionQuery(favoriteCarId).useHookInitializer({ locale }, params)
}
