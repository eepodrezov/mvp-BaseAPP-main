import { CONFIRM_CODE_REQUEST_TARGET, RESEND_ACTIVATION_CODE_REQUEST_TARGET } from '@/features'
import Mock from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL } from '../helpers'

export const confirmCode = [
  rest.post(addBaseDataURL(CONFIRM_CODE_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(Mock.mock(CONFIRM_CODE_ENTITY_MOCK)))
  }),
  rest.post(addBaseDataURL(RESEND_ACTIVATION_CODE_REQUEST_TARGET), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(Mock.mock(CONFIRM_CODE_ENTITY_MOCK)))
  }),
]

const CONFIRM_CODE_ENTITY_MOCK = {
  'id|+1': 1,
  code: '@word',
  email: '@email',
  phone: '89999999999',
  newPassword: '@word',
} as { [key: string]: unknown }
