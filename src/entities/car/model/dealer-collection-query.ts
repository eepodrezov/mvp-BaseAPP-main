import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchDealers } from './car-requests'
import { Dealer, DEALERS_COLLECTION_PRIMARY_KEY, SELECT_FILTER_COLLECTION_INITIAL_FILTERS } from '../lib'
import { CollectionResponse } from '@/shared/@types'
import { atom, useAtomValue } from 'jotai'

export const dealerCollectionName = atom('')

const dealerCollectionQuery = queryFactory(
  DEALERS_COLLECTION_PRIMARY_KEY,
  queryFetchDealers,
  SELECT_FILTER_COLLECTION_INITIAL_FILTERS
)(filters => ({
  params: filters,
}))

export const prefetchDealerCollection = dealerCollectionQuery.prefetch

export const useDealerCollection = (params?: QueryParams<CollectionResponse<Dealer>>) => {
  const { locale } = useRouter()
  const name = useAtomValue(dealerCollectionName)

  return dealerCollectionQuery.useHookInitializer(
    {
      name,
      locale,
    },
    params
  )
}
