import {
  CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
  CURRENT_VIEWER_ID_REQUEST_TARGET,
  User,
} from '@/entities/viewer'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import { RequestChangePassword } from '../lib'

export const queryFetchChangePassword = (
  id: number,
  oldPassword: string,
  newPassword: string,
  repeatPassword: string
) =>
  queryFetchFactory<User, RequestChangePassword>(
    getSingleRequestTarget(id, CURRENT_VIEWER_ID_REQUEST_TARGET) + CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
    {
      method: 'PUT',
      data: { oldPassword, newPassword, repeatPassword },
    }
  )
