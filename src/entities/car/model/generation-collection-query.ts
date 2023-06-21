import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchGenerations } from './car-requests'
import { Generation, GENERATIONS_COLLECTION_PRIMARY_KEY, SELECT_FILTER_COLLECTION_INITIAL_FILTERS } from '../lib'
import { CollectionResponse } from '@/shared/@types'
import { atom, useAtomValue } from 'jotai'

export const generationCollectionName = atom('')

const generationCollectionQuery = queryFactory(
  GENERATIONS_COLLECTION_PRIMARY_KEY,
  queryFetchGenerations,
  SELECT_FILTER_COLLECTION_INITIAL_FILTERS
)(filters => ({
  params: filters,
}))

export const prefetchGenerationCollection = generationCollectionQuery.prefetch

export const useGenerationCollection = (params?: QueryParams<CollectionResponse<Generation>>) => {
  const { locale } = useRouter()
  const name = useAtomValue(generationCollectionName)

  return generationCollectionQuery.useHookInitializer(
    {
      name,
      locale,
    },
    params
  )
}
