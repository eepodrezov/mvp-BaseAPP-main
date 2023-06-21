import { queryFactory, QueryParams } from '@/shared/lib'
import { CURRENT_VIEWER_SETTINGS_PRIMARY_KEY, USER_CREATE_PRIMARY_KEY } from '@/entities/viewer'
import { RequestUserSettings, ResponseUserSettings } from '../lib'
import { queryFetchChangeSettings, queryFetchCreateSettings, queryFetchSettings } from './change-settings-request'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { CollectionResponse } from '@/shared/@types'

const settingsQuery = (id: number) =>
  queryFactory([...CURRENT_VIEWER_SETTINGS_PRIMARY_KEY, id], queryFetchSettings(id))()

export const useSettingsCollection = (id: number, params?: QueryParams<CollectionResponse<ResponseUserSettings>>) => {
  const { locale } = useRouter()
  return settingsQuery(id).useHookInitializer({ locale }, params)
}

export const useChangeSettings = (
  options?: Omit<
    UseMutationOptions<
      ResponseUserSettings,
      AxiosError,
      Partial<RequestUserSettings> & Required<Pick<RequestUserSettings, 'id'>>
    >,
    'mutationFn'
  >,
  config?: AxiosRequestConfig
) =>
  useMutation(({ id, email, sms, telegram }) => queryFetchChangeSettings(id, email, sms, telegram)(config)(), {
    ...options,
    mutationKey: CURRENT_VIEWER_SETTINGS_PRIMARY_KEY,
  })

export const useCreateSettings = (
  options?: Omit<UseMutationOptions<ResponseUserSettings, AxiosError, Omit<RequestUserSettings, 'id'>>, 'mutationFn'>,
  config?: AxiosRequestConfig
) =>
  useMutation(({ email, sms, telegram }) => queryFetchCreateSettings(email, sms, telegram)(config)(), {
    ...options,
    mutationKey: [...CURRENT_VIEWER_SETTINGS_PRIMARY_KEY, ...USER_CREATE_PRIMARY_KEY],
  })
