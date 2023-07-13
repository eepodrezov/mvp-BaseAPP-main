import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { Step, STEP_SINGLE_PRIMARY_KEY } from '../lib'
import { queryFetchStep } from './order-requests'

const stepCollectionQuery = (stepId: number) =>
  queryFactory([...STEP_SINGLE_PRIMARY_KEY, stepId], queryFetchStep(stepId), {})()

export const useGetStep = (stepId?: number, params?: QueryParams<Step>) => {
  const { locale } = useRouter()

  return stepCollectionQuery(stepId || 0).useHookInitializer({ locale }, { retry: false, enabled: !!stepId, ...params })
}
