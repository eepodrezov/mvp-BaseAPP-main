import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchMaterials } from './car-requests'
import { Color, MATERIALS_COLLECTION_PRIMARY_KEY } from '../lib'
import { CollectionResponse } from '@/shared/@types'

const materialCollectionQuery = queryFactory(MATERIALS_COLLECTION_PRIMARY_KEY, queryFetchMaterials, {
  itemsPerPage: 100,
})(filters => ({
  params: filters,
}))

export const useMaterialCollection = (params?: QueryParams<CollectionResponse<Color>>) => {
  const { locale } = useRouter()

  return materialCollectionQuery.useHookInitializer({ locale }, params)
}
