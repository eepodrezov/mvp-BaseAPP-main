import {
  CURRENT_VIEWER_CALLBACK_REQUEST_TARGET,
  CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
  CURRENT_VIEWER_ID_REQUEST_TARGET,
  CURRENT_VIEWER_REQUEST_TARGET,
  CURRENT_VIEWER_SETTINGS_REQUEST_TARGET,
  USERS_COLLECTION_SETTINGS_REQUEST_TARGET,
  USERS_REQUEST_TARGET,
} from '@/entities/viewer'
import { USER_ENTITY_MOCK, USER_NOTIFICATION_MOCK } from '@/shared/config'
import { getSingleRequestTarget } from '@/shared/lib'
import Mock from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'

export const users = [
  rest.get(addBaseDataURL(CURRENT_VIEWER_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(Mock.mock(USER_ENTITY_MOCK)))
  }),
  rest.post(addBaseDataURL(USERS_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(Mock.mock(USER_ENTITY_MOCK)))
  }),
  rest.put(
    addBaseDataURL(CURRENT_VIEWER_ID_REQUEST_TARGET + CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET),
    (_, res, ctx) => {
      return res(ctx.status(201), ctx.json(Mock.mock({ message: 'ok' })))
    }
  ),
  rest.get(addBaseDataURL(USERS_COLLECTION_SETTINGS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, USER_NOTIFICATION_MOCK)))
  }),
  rest.post(addBaseDataURL(USERS_COLLECTION_SETTINGS_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(Mock.mock(USER_NOTIFICATION_MOCK)))
  }),
  rest.put(addBaseDataURL(getSingleRequestTarget(1, CURRENT_VIEWER_SETTINGS_REQUEST_TARGET)), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(Mock.mock(USER_NOTIFICATION_MOCK)))
  }),
  rest.post(addBaseDataURL(CURRENT_VIEWER_CALLBACK_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(Mock.mock(USER_ENTITY_MOCK)))
  }),
]
