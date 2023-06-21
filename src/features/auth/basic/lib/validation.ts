import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { validatePhone, validateEmail, getOnlyDigitsString } from '@/shared/helpers'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const authSchema = (t: TFunction) =>
  yup.object({
    username: yup
      .string()
      .required(t('validRequiredField'))
      .test('email_or_phone', t('validLogin'), value => {
        return validateEmail(value) || validatePhone(parseInt(getOnlyDigitsString(value)))
      }),
    password: yup.string().required(t('validRequiredField')),
  })

export const serverSideAuthValidation = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.message) {
    case 'The user credentials were incorrect.': {
      notify(t('The user credentials were incorrect'), { status: 'error' })
      return
    }
    case 'Слишком частые запросы': {
      notify(t('Too frequent requests'), { status: 'error' })
      return
    }
    case 'min8symbols': {
      notify(t('min8symbols'), { status: 'error' })
      return
    }
    case 'user not activated': {
      notify(t('You need to confirm your registration to login'), { status: 'error' })
      return
    }
    default: {
      notify(t('serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
