import { RequestConfirmCodeTypes } from '@/features'
import { queryFetchFactory } from '@/shared/lib'
import { CONFIRM_CODE_REQUEST_TARGET } from '../lib'

export const queryFetchConfirmCode = (code?: string, phone?: string, email?: string, isRepeat?: boolean) =>
  queryFetchFactory<RequestConfirmCodeTypes>(CONFIRM_CODE_REQUEST_TARGET, {
    method: 'POST',
    data: { phone, email, code, isRepeat },
  })
