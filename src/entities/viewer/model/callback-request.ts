import { CURRENT_VIEWER_CALLBACK_REQUEST_TARGET, RequestCallback, User } from '@/entities/viewer'
import { queryFetchFactory } from '@/shared/lib'

export const queryFetchCallback = (phone: string, currentLink?: string, comment?: string) =>
  queryFetchFactory<User, RequestCallback>(CURRENT_VIEWER_CALLBACK_REQUEST_TARGET, {
    method: 'POST',
    data: { phone, currentLink, comment },
  })
