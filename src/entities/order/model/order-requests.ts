import { CollectionResponse } from '@/shared/@types'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import {
  Order,
  ORDERS_REQUEST_TARGET,
  ORDER_REQUEST_TARGET,
  ORDER_PAY_REQUEST_TARGET,
  Payment,
  PAYMENTS_REQUEST_TARGET,
  OrderCar,
} from '../lib'

export const queryFetchOrders = queryFetchFactory<CollectionResponse<OrderCar>>(ORDERS_REQUEST_TARGET)

export const queryFetchOrder = (orderId: number) =>
  queryFetchFactory<Order>(getSingleRequestTarget(orderId, ORDER_REQUEST_TARGET))

export const queryCreateOrder = (carId: number) =>
  queryFetchFactory<Order>(ORDERS_REQUEST_TARGET, { method: 'POST', data: { car: `/autos/${carId}` } })

export const queryPayOrder = (orderId: number) =>
  queryFetchFactory<Payment>(getSingleRequestTarget(orderId, ORDER_PAY_REQUEST_TARGET), { method: 'POST', data: {} })

export const queryFetchPayments = queryFetchFactory<CollectionResponse<Payment>>(PAYMENTS_REQUEST_TARGET)

export const queryFetchDeleteOrder = (carId: number) =>
  queryFetchFactory<{}>(getSingleRequestTarget(carId, ORDER_REQUEST_TARGET), { method: 'DELETE', data: {} })
