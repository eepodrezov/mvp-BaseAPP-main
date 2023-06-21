import { queryFetchFactory } from '@/shared/lib'
import { Delivery, DELIVERY_REQUEST_TARGET } from '../lib'

export const queryFetchDelivery = queryFetchFactory<Delivery>(DELIVERY_REQUEST_TARGET)
