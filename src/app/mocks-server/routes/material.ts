import { rest } from 'msw'
import { MATERIAL_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL, getBaseResponseCollectionModel } from '../helpers'
import { MATERIALS_REQUEST_TARGET } from '@/entities/car'

export const materials = [
  rest.get(addBaseDataURL(MATERIALS_REQUEST_TARGET), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBaseResponseCollectionModel(req, MATERIAL_ENTITY_MOCK)))
  }),
]
