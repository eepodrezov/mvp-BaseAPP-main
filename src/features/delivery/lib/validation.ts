import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import { TFunction } from 'next-i18next'

export const serverSideValidationDeliveryCalculator = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.detail) {
    default: {
      notify(t('common:serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
