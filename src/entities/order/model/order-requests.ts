import { CollectionResponse } from '@/shared/@types'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import {
  Order,
  Step,
  ORDERS_REQUEST_TARGET,
  ORDER_REQUEST_TARGET,
  STEP_REQUEST_TARGET,
  ORDER_PAY_REQUEST_TARGET,
  Payment,
  PAYMENTS_REQUEST_TARGET,
  OrderCar,
  ORDERS_CALLBACK_TARGET,
  Documents,
  DOCUMENTS_REQUEST_TARGET,
  PaymentInstruction,
  PAYMENT_INSCTRUCTION_REQUEST_TARGET,
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

export const queryFetchStep = (stepId: number) =>
  queryFetchFactory<Step>(getSingleRequestTarget(stepId, STEP_REQUEST_TARGET))

export const queryOrderCallback = (orderId: number) =>
  queryFetchFactory<{ message: string }>(ORDERS_CALLBACK_TARGET, {
    method: 'POST',
    data: { orderId },
  })

export const queryFetchDocuments = queryFetchFactory<CollectionResponse<Documents>>(DOCUMENTS_REQUEST_TARGET)

export const queryFetchPaymentInstruction = queryFetchFactory<CollectionResponse<PaymentInstruction>>(
  PAYMENT_INSCTRUCTION_REQUEST_TARGET
)
