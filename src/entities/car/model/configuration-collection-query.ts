import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchConfigurations } from './car-requests'
import { Configuration, CONFIGURATIONS_COLLECTION_PRIMARY_KEY } from '../lib'
import { CollectionResponse, Nullable } from '@/shared/@types'
import { useAtomValue } from 'jotai'
import { carCollectionModel } from './car-collection-query'

const configurationCollectionQuery = queryFactory(CONFIGURATIONS_COLLECTION_PRIMARY_KEY, queryFetchConfigurations, {
  model: null as Nullable<number>,
})(filters => ({
  params: filters,
}))

export const prefetchConfigurationCollection = configurationCollectionQuery.prefetch

export const useConfigurationCollection = (params?: QueryParams<CollectionResponse<Configuration>>) => {
  const { locale } = useRouter()
  const model = useAtomValue(carCollectionModel)

  return configurationCollectionQuery.useHookInitializer(
    {
      model,
      locale,
    },
    params
  )
}
