import {
  CARS_REQUEST_TARGET,
  CAR_REQUEST_TARGET,
  FAVORITES_COLLECTION_REQUEST_TARGET,
  FAVORITE_SINGLE_REQUEST_TARGET,
  FILTER_DATA_REQUEST_TARGET,
  STOCK_COLLECTION_REQUEST_TARGET,
  STOCK_SINGLE_DELETE_REQUEST_TARGET,
  STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET,
} from '@/entities/car'
import { DELIVERY_REQUEST_TARGET } from '@/features/delivery'
import {
  CAR_ENTITY_MOCK,
  CAR_FILTER_DATA_ENTITY_MOCK,
  DELIVERY_ENTITY_MOCK,
  FAVORITE_CAR_ENTITY_MOCK,
} from '@/shared/config'
import { getSingleRequestTarget } from '@/shared/lib'
import { mock } from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'

export const cars = [
  rest.get(addBaseDataURL(CARS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, CAR_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(FILTER_DATA_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(CAR_FILTER_DATA_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(DELIVERY_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(DELIVERY_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(FAVORITES_COLLECTION_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, FAVORITE_CAR_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(getSingleRequestTarget(1, FAVORITE_SINGLE_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(FAVORITE_CAR_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(STOCK_COLLECTION_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, CAR_ENTITY_MOCK)))
  }),
  rest.put(addBaseDataURL(getSingleRequestTarget(1, STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(CAR_ENTITY_MOCK)))
  }),
  rest.put(addBaseDataURL(getSingleRequestTarget(1, STOCK_SINGLE_DELETE_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(CAR_ENTITY_MOCK)))
  }),
  rest.get(addBaseDataURL(CAR_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(CAR_ENTITY_MOCK)))
  }),
]
