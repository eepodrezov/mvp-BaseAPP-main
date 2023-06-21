import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { CollectionResponse } from '@/shared/@types'
import { USER_DOCUMENT_PRIMARY_KEY, UserDocument } from '../lib'
import { queryFetchUserDocuments } from './user-document-viewer-request'

const userDocumentCollectionQuery = queryFactory(USER_DOCUMENT_PRIMARY_KEY, queryFetchUserDocuments, {
  itemsPerPage: 10,
})(filters => ({
  params: filters,
}))

export const useUserDocumentCollection = (params?: QueryParams<CollectionResponse<UserDocument>>) => {
  const { locale } = useRouter()
  return userDocumentCollectionQuery.useHookInitializer({ locale }, params)
}
