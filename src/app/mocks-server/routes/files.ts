import { FILE_ENTITY_MOCK } from '@/shared/config'
import Mock from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL } from '../helpers'

export const files = [
  rest.post(addBaseDataURL('/files'), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(Mock.mock(FILE_ENTITY_MOCK)))
  }),
]
