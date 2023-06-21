import { rest } from 'msw'
import { MANUFACTURER_TYPE_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { MANUFACTURERS_REQUEST_TARGET } from '@/entities/car'

export const manufacturers = [
  rest.get(addBaseDataURL(MANUFACTURERS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, MANUFACTURER_TYPE_ENTITY_MOCK)))
  }),
]
