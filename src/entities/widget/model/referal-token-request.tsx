import { queryFetchFactory } from '@/shared/lib'
import { REFERAL_TOKEN_REQUEST_TARGET, ReferalToken } from '../lib/constants'

export const queryFetchReferalToken = queryFetchFactory<ReferalToken>(REFERAL_TOKEN_REQUEST_TARGET)
