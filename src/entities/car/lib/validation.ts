import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'

export const serverSideValidationFavorite = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.detail) {
    case 'auto with current id not found': {
      notify(t('car:car_not_found'), { status: 'error' })
      return
    }
    default: {
      notify(t('common:serverErrorMessage'), { status: 'error' })
      return
    }
  }
}

export const serverSideValidationStock = (t: TFunction, error?: AxiosError<any, any>) => {
  notify(t(error?.response?.data?.detail || 'common:serverErrorMessage'), { status: 'error' })
  return
}
