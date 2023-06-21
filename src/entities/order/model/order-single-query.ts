import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { Order, ORDER_SINGLE_PRIMARY_KEY } from '../lib'
import { queryFetchOrder } from './order-requests'

const orderCollectionQuery = (orderId: number) =>
  queryFactory([...ORDER_SINGLE_PRIMARY_KEY, orderId], queryFetchOrder(orderId), {})()

export const useGetOrder = (orderId: number, params?: QueryParams<Order>) => {
  const { locale } = useRouter()

  return orderCollectionQuery(orderId).useHookInitializer({ locale }, params)
}
