import { RequestConfirmCodeTypes } from '@/features'
import { getObjectWithoutEmptyProperty } from '@/shared/helpers'
import { queryFetchFactory } from '@/shared/lib'
import { RESEND_ACTIVATION_CODE_REQUEST_TARGET } from '../lib'

export const queryFetchResendActivationCode = (
  email?: string,
  phone?: string,
  code?: string,
  newPassword?: string,
  isRepeat?: boolean
) =>
  queryFetchFactory<RequestConfirmCodeTypes>(RESEND_ACTIVATION_CODE_REQUEST_TARGET, {
    method: 'POST',
    data: getObjectWithoutEmptyProperty({ phone, email, code, newPassword, isRepeat }),
  })
