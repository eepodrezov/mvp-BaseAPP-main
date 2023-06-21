import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { USER_COLLECTION_PRIMARY_KEY, User } from '../lib'
import { queryFetchCurrentViewer } from './current-viewer-request'

const currentViewerQuery = queryFactory(USER_COLLECTION_PRIMARY_KEY, queryFetchCurrentViewer)()

export const useCurrentViewer = (params?: QueryParams<User>) => {
  const { locale } = useRouter()

  return currentViewerQuery.useHookInitializer({ locale }, params)
}
