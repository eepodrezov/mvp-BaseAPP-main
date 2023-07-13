import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'

export const serverSideCallbackValidation = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.detail) {
    default: {
      notify(t('common:serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
