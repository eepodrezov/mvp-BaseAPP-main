import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchBrands } from './car-requests'
import { Brand, BRANDS_COLLECTION_PRIMARY_KEY, SELECT_FILTER_COLLECTION_INITIAL_FILTERS } from '../lib'
import { CollectionResponse } from '@/shared/@types'
import { atom, useAtomValue } from 'jotai'

export const brandCollectionName = atom('')

const brandCollectionQuery = queryFactory(
  BRANDS_COLLECTION_PRIMARY_KEY,
  queryFetchBrands,
  SELECT_FILTER_COLLECTION_INITIAL_FILTERS
)(filters => ({
  params: filters,
}))

export const prefetchBrandCollection = brandCollectionQuery.prefetch

export const useBrandCollection = (params?: QueryParams<CollectionResponse<Brand>>) => {
  const { locale } = useRouter()
  const name = useAtomValue(brandCollectionName)

  return brandCollectionQuery.useHookInitializer(
    {
      name,
      locale,
    },
    params
  )
}
