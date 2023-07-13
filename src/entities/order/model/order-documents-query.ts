import { QueryParams, queryFactory } from '@/shared/lib'
import { CollectionResponse } from '@/shared/@types'
import { DOCUMENTS_COLLECTION_PRIMARY_KEY, Documents } from '../lib'
import { queryFetchDocuments } from './order-requests'
import { useRouter } from 'next/router'
import { SORT_DESC } from '@/shared/config'

const documentsCollectionQuery = (stepId: number) =>
  queryFactory([...DOCUMENTS_COLLECTION_PRIMARY_KEY, stepId], queryFetchDocuments, {
    itemsPerPage: 1,
    'order[id]': SORT_DESC,
    'step.id': stepId,
  })(filters => ({
    params: filters,
  }))

export const useDocumentsCollection = (stepId?: number, params?: QueryParams<CollectionResponse<Documents>>) => {
  const { locale } = useRouter()

  return documentsCollectionQuery(stepId || 0).useHookInitializer(
    { locale },
    { enabled: !!stepId, retry: false, ...params }
  )
}
