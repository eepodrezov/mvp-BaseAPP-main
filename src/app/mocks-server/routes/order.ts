import { ORDERS_REQUEST_TARGET, ORDER_PAY_REQUEST_TARGET, ORDER_REQUEST_TARGET } from '@/entities/order'
import { ORDER_CAR_ENTITY_MOCK, ORDER_ENTITY_MOCK, PAYMENT_ENTITY_MOCK } from '@/shared/config'
import { getSingleRequestTarget } from '@/shared/lib'
import { mock } from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'

export const orders = [
  rest.get(addBaseDataURL(getSingleRequestTarget(0, ORDER_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(ORDER_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(ORDERS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, ORDER_CAR_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(ORDER_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(ORDER_CAR_ENTITY_MOCK)))
  }),
  rest.post(addBaseDataURL(ORDERS_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(mock(ORDER_ENTITY_MOCK)))
  }),
  rest.post(addBaseDataURL(ORDER_PAY_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(mock(PAYMENT_ENTITY_MOCK)))
  }),
  rest.delete(addBaseDataURL(getSingleRequestTarget(1, ORDER_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'ok' }))
  }),
]
