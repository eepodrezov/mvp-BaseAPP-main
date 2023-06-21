import { rest } from 'msw'
import { COLOR_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { COLORS_REQUEST_TARGET } from '@/entities/car'

export const colors = [
  rest.get(addBaseDataURL(COLORS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, COLOR_ENTITY_MOCK)))
  }),
]
