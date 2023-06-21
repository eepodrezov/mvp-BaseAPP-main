import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchBodyTypes } from './car-requests'
import { BodyType, BODY_TYPES_COLLECTION_PRIMARY_KEY } from '../lib'
import { CollectionResponse, Nullable } from '@/shared/@types'
import { useAtomValue } from 'jotai'
import { carCollectionModel } from './car-collection-query'

const bodyTypesCollectionQuery = queryFactory(BODY_TYPES_COLLECTION_PRIMARY_KEY, queryFetchBodyTypes, {
  model: null as Nullable<number>,
})(filters => ({
  params: filters,
}))

export const prefetchBodyTypeCollection = bodyTypesCollectionQuery.prefetch

export const useBodyTypeCollection = (params?: QueryParams<CollectionResponse<BodyType>>) => {
  const { locale } = useRouter()
  const model = useAtomValue(carCollectionModel)

  return bodyTypesCollectionQuery.useHookInitializer(
    {
      model,
      locale,
    },
    params
  )
}
