import { rest } from 'msw'
import { BRAND_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { BRANDS_REQUEST_TARGET } from '@/entities/car'

export const brands = [
  rest.get(addBaseDataURL(BRANDS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, BRAND_ENTITY_MOCK)))
  }),
]
