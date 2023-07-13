import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { REFERAL_TOKEN_PRIMARY_KEY, ReferalToken } from '../lib/constants'
import { queryFetchReferalToken } from './referal-token-request'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'

const currentViewerQuery = queryFactory<ReferalToken>(REFERAL_TOKEN_PRIMARY_KEY, queryFetchReferalToken)()

export const useReferalToken = (params?: QueryParams<ReferalToken>) => {
  const { locale } = useRouter()
  const viewer = useAtomValue(viewerAtom)

  return currentViewerQuery.useHookInitializer({ locale }, { enabled: !!viewer, ...params })
}
