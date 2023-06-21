import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'

export const serverSideValidationUserDocumentCreate = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data.detail) {
    case 'У пользователя уже есть документ': {
      notify(t('User already have user document'), { status: 'error' })
      break
    }
    default: {
      notify(t('serverErrorMessage'), { status: 'error' })
      break
    }
  }
}
