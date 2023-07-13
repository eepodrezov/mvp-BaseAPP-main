export const REFERAL_TOKEN_REQUEST_TARGET = '/users/referral_token'
export const REFERAL_TOKEN_PRIMARY_KEY = [REFERAL_TOKEN_REQUEST_TARGET, 'referal-token']

export interface ReferalToken {
  token: string
}
