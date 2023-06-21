import { User, CURRENT_VIEWER_ID_REQUEST_TARGET } from '@/entities/viewer'
import { getObjectWithoutEmptyProperty } from '@/shared/helpers'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import { RequestChangePrivateInfo } from '../lib'

export const queryFetchChangePrivateInfo = (
  id: number,
  email?: string,
  phone?: string,
  telegram?: string,
  isRepeat?: boolean
) =>
  queryFetchFactory<User, RequestChangePrivateInfo>(getSingleRequestTarget(id, CURRENT_VIEWER_ID_REQUEST_TARGET), {
    method: 'PUT',
    data: getObjectWithoutEmptyProperty({ id, email, phone, telegram, isRepeat }),
  })
