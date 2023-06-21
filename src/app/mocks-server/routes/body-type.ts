import { rest } from 'msw'
import { BODY_TYPE_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { BODY_TYPES_REQUEST_TARGET } from '@/entities/car'

export const bodyTypes = [
  rest.get(addBaseDataURL(BODY_TYPES_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, BODY_TYPE_ENTITY_MOCK)))
  }),
]
