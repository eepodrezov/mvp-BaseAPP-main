import { QueryParams, queryFactory } from '@/shared/lib'
import { PAYMENT_INSCTRUCTION_PRIMARY_KEY, PaymentInstruction } from '../lib'
import { queryFetchPaymentInstruction } from './order-requests'
import { useRouter } from 'next/router'
import { SORT_DESC } from '@/shared/config'
import { CollectionResponse } from '@/shared/@types'

const paymentInstructionCollectionQuery = queryFactory(PAYMENT_INSCTRUCTION_PRIMARY_KEY, queryFetchPaymentInstruction, {
  'order[version]': SORT_DESC,
})(filters => ({
  params: filters,
}))

export const usePaymentInstructionCollection = (
  stepId?: number,
  params?: QueryParams<CollectionResponse<PaymentInstruction>>
) => {
  const { locale } = useRouter()

  return paymentInstructionCollectionQuery.useHookInitializer(
    { locale },
    { retry: false, enabled: !!stepId, ...params }
  )
}
