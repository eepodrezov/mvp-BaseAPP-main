import { InfiniteQueryParams, queryFactory } from '@/shared/lib'
import { CollectionResponse } from '@/shared/@types'
import { ORDERS_COLLECTION_PRIMARY_KEY, OrderCar } from '../lib'
import { queryFetchOrders } from './order-requests'

const ordersCollectionQuery = queryFactory(
  ORDERS_COLLECTION_PRIMARY_KEY,
  queryFetchOrders,
  {
    itemsPerPage: 10,
    'order[id]': 'desc',
  },
  'infinite'
)(filters => ({
  params: filters,
}))

export const useOrdersCollection = (params?: InfiniteQueryParams<CollectionResponse<OrderCar>>) =>
  ordersCollectionQuery.useHookInitializer({}, params)
