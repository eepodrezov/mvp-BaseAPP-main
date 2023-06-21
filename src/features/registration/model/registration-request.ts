import { USERS_REQUEST_TARGET, User } from '@/entities/viewer'
import { queryFetchFactory } from '@/shared/lib'
import { RequestRegistrationTypes } from '../lib'

export const queryFetchRegistration = (data: RequestRegistrationTypes) =>
  queryFetchFactory<User, RequestRegistrationTypes>(USERS_REQUEST_TARGET, {
    method: 'POST',
    data,
  })
