import { rest } from 'msw'
import { DEALER_TYPE_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { CONFIGURATIONS_REQUEST_TARGET } from '@/entities/car'

export const configurations = [
  rest.get(addBaseDataURL(CONFIGURATIONS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, DEALER_TYPE_ENTITY_MOCK)))
  }),
]
