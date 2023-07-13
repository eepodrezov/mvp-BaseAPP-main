import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { useAtomValue } from 'jotai'
import { Delivery, DELIVERY_PRIMARY_KEY } from '../lib'
import { queryFetchDelivery } from './delivert-requests'
import { deliveryCarIdAtom } from './store'

const deliveryQuery = queryFactory(DELIVERY_PRIMARY_KEY, queryFetchDelivery)(filters => ({ params: filters }))

export const useGetDelivery = (params?: QueryParams<Delivery>) => {
  const { locale } = useRouter()
  const carId = useAtomValue(deliveryCarIdAtom)

  return deliveryQuery.useHookInitializer(
    {
      id: carId,
      locale,
    },
    { ...params, enabled: !!carId }
  )
}
