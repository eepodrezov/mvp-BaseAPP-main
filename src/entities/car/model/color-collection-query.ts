import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchColors } from './car-requests'
import { Color, COLOR_TYPE_BODY, COLOR_TYPE_INTER, COLORS_COLLECTION_PRIMARY_KEY } from '../lib'
import { CollectionResponse } from '@/shared/@types'

const colorCollectionQuery = queryFactory(COLORS_COLLECTION_PRIMARY_KEY, queryFetchColors, {
  itemsPerPage: 100,
  type: COLOR_TYPE_INTER,
  isDefaultInGroup: true,
})(filters => ({
  params: filters,
}))

export const useColorInteriorCollection = (params?: QueryParams<CollectionResponse<Color>>) => {
  const { locale } = useRouter()

  return colorCollectionQuery.useHookInitializer({ locale }, params)
}

export const useColorExteriorCollection = (params?: QueryParams<CollectionResponse<Color>>) => {
  const { locale } = useRouter()

  return colorCollectionQuery.useHookInitializer({ locale, type: COLOR_TYPE_BODY }, params)
}
