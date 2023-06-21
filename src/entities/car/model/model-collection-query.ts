import { useRouter } from 'next/router'
import { queryFactory, QueryParams } from '@/shared/lib'
import { queryFetchModels } from './car-requests'
import { Model, MODELS_COLLECTION_PRIMARY_KEY, SELECT_FILTER_COLLECTION_INITIAL_FILTERS } from '../lib'
import { CollectionResponse, Nullable } from '@/shared/@types'
import { atom, useAtomValue } from 'jotai'
import { carCollectionBrand } from './car-collection-query'

export const modelCollectionName = atom('')

const modelsCollectionQuery = queryFactory(MODELS_COLLECTION_PRIMARY_KEY, queryFetchModels, {
  ...SELECT_FILTER_COLLECTION_INITIAL_FILTERS,
  'brand.id': null as Nullable<number>,
})(filters => ({
  params: filters,
}))

export const prefetchModelCollection = modelsCollectionQuery.prefetch

export const useModelCollection = (params?: QueryParams<CollectionResponse<Model>>) => {
  const { locale } = useRouter()
  const name = useAtomValue(modelCollectionName)
  const brand = useAtomValue(carCollectionBrand)

  return modelsCollectionQuery.useHookInitializer(
    {
      name,
      'brand.id': brand,
      locale,
    },
    params
  )
}
