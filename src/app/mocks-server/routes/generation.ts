import { rest } from 'msw'
import { GENERATION_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { GENERATIONS_REQUEST_TARGET } from '@/entities/car'

export const generations = [
  rest.get(addBaseDataURL(GENERATIONS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, GENERATION_ENTITY_MOCK)))
  }),
]
