import { rest } from 'msw'
import { MODEL_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { MODELS_REQUEST_TARGET } from '@/entities/car'

export const models = [
  rest.get(addBaseDataURL(MODELS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, MODEL_ENTITY_MOCK)))
  }),
]
