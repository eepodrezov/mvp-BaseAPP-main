import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchCountries } from './car-requests'
import { Country, MANUFACTURERS_COUNTRY_COLLECTION_PRIMARY_KEY, SELECT_FILTER_COLLECTION_INITIAL_FILTERS } from '../lib'
import { CollectionResponse } from '@/shared/@types'
import { atom, useAtomValue } from 'jotai'

export const manufacturerCountryCollectionName = atom('')

const manufacturerCountryCollectionQuery = queryFactory(
  MANUFACTURERS_COUNTRY_COLLECTION_PRIMARY_KEY,
  queryFetchCountries,
  SELECT_FILTER_COLLECTION_INITIAL_FILTERS
)(filters => ({
  params: filters,
}))

export const prefetchManufacturerCountryCollection = manufacturerCountryCollectionQuery.prefetch

export const useManufacturerCountryCollection = (params?: QueryParams<CollectionResponse<Country>>) => {
  const { locale } = useRouter()
  const name = useAtomValue(manufacturerCountryCollectionName)

  return manufacturerCountryCollectionQuery.useHookInitializer(
    {
      name,
      locale,
    },
    params
  )
}
