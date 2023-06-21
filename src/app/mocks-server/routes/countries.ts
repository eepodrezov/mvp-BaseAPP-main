import { rest } from 'msw'
import { COUNTRIES_TYPE_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { COUNTRIES_REQUEST_TARGET } from '@/entities/car'

export const countries = [
  rest.get(addBaseDataURL(COUNTRIES_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, COUNTRIES_TYPE_ENTITY_MOCK)))
  }),
]
