import { httpClient, queryFetchFactory } from '@/shared/lib'
import { AxiosRequestConfig } from 'axios'
import { USER_DOCUMENTS_TARGET, UserDocument } from '../lib'
import { CollectionResponse } from '@/shared/@types'

export const postPassportData = (config: AxiosRequestConfig<UserDocument>) =>
  // TODO:Доделать типы как будут
  httpClient<{}, UserDocument>({
    ...config,
    url: USER_DOCUMENTS_TARGET,
    method: 'POST',
  })

export const queryFetchUserDocuments = queryFetchFactory<CollectionResponse<UserDocument>>(USER_DOCUMENTS_TARGET)
