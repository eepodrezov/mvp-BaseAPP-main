import { USER_DOCUMENTS_TARGET } from '@/entities/viewer'
import { USER_DOCUMENT_MOCK } from '@/shared/config'
import { mock } from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL } from '../helpers'

export const userDocument = [
  rest.post(addBaseDataURL(USER_DOCUMENTS_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(USER_DOCUMENT_MOCK)))
  }),
  rest.get(addBaseDataURL(USER_DOCUMENTS_TARGET), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock(USER_DOCUMENT_MOCK)))
  }),
]
