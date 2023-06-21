import { useRouter } from 'next/router'
import { queryFactory, QueryParams } from '@/shared/lib'
import { queryFetchManufacturers } from './car-requests'
import { Manufacturer, MANUFACTURERS_COLLECTION_PRIMARY_KEY } from '../lib'
import { CollectionResponse, Nullable } from '@/shared/@types'
import { useAtomValue } from 'jotai'
import { carCollectionManufacturerCountry } from './car-collection-query'

const manufacturerCollectionQuery = queryFactory(MANUFACTURERS_COLLECTION_PRIMARY_KEY, queryFetchManufacturers, {
  location: null as Nullable<number>,
})(filters => ({
  params: filters,
}))

export const prefetchManufacturerCollection = manufacturerCollectionQuery.prefetch

export const useManufacturerCollection = (params?: QueryParams<CollectionResponse<Manufacturer>>) => {
  const { locale } = useRouter()
  const manufacturerCountry = useAtomValue(carCollectionManufacturerCountry)

  return manufacturerCollectionQuery.useHookInitializer(
    {
      location: manufacturerCountry,
      locale,
    },
    params
  )
}
