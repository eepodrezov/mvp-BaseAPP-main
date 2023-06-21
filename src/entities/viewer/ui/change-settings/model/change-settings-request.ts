import { CURRENT_VIEWER_SETTINGS_REQUEST_TARGET, USERS_COLLECTION_SETTINGS_REQUEST_TARGET } from '@/entities/viewer'
import { CollectionResponse } from '@/shared/@types'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import { ResponseUserSettings, RequestUserSettings } from '../lib'

export const queryFetchSettings = (id: number) =>
  queryFetchFactory<CollectionResponse<ResponseUserSettings>>(USERS_COLLECTION_SETTINGS_REQUEST_TARGET, {
    data: { user: `users/${id}` },
  })

export const queryFetchChangeSettings = (id: number, email?: boolean, sms?: boolean, telegram?: boolean) =>
  queryFetchFactory<ResponseUserSettings, RequestUserSettings>(
    getSingleRequestTarget(id, CURRENT_VIEWER_SETTINGS_REQUEST_TARGET),
    {
      method: 'PUT',
      data: { email, sms, telegram },
    }
  )

export const queryFetchCreateSettings = (email: boolean, sms: boolean, telegram: boolean) =>
  queryFetchFactory<ResponseUserSettings, RequestUserSettings>(USERS_COLLECTION_SETTINGS_REQUEST_TARGET, {
    method: 'POST',
    data: { email, sms, telegram },
  })
