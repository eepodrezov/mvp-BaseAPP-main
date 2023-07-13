import { TFunction } from '@/shared/@types'
import { validateEmail, validatePhone, getOnlyDigitsString } from '@/shared/helpers'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const passwordRecoveryUsernameSchema = (t: TFunction) =>
  yup.object({
    username: yup
      .string()
      .required(t('validRequiredField'))
      .test('email_or_phone', t('validLogin'), value => {
        return validateEmail(value) || validatePhone(parseInt(getOnlyDigitsString(value)))
      }),
  })

export const passwordRecoveryPasswordsSchema = (t: TFunction, withCode?: boolean) =>
  yup.object({
    code: yup.string().when({
      is: () => withCode,
      then: schema => schema.required(t('validRequiredField')).length(4, t('code must be 4 symbols')),
      otherwise: schema => schema.nullable().notRequired(),
    }),
    newPassword: yup.string().required(t('validRequiredField')).min(8, t('min8symbols')),
    repeatPassword: yup
      .string()
      .required(t('validRequiredField'))
      .min(8, t('min8symbols'))
      .oneOf([yup.ref('newPassword'), null], t('PasswordsMustMatch')),
  })

export const serverSidePasswordRecoveryValidation = (t: TFunction, error?: AxiosError<any, any>) => {
  const message = error?.response?.data.detail
  if (error?.response?.status === 500) {
    notify(t('serverErrorMessage'), { status: 'error' })
    return
  }
  if (message.includes('Пользователь не найден')) notify(t('User_is_not_found'), { status: 'error' })
  if (message.includes('Ваш аккаунт не подтвержден')) notify(t('Account_not_enabled'), { status: 'error' })
  if (message.includes('Вы уже запросили код, попробуйте позже')) notify(t('Code_limit'), { status: 'error' })
  if (message.includes('Введенный номер телефона не принадлежит пользователю с данным именем'))
    notify(t('Phone_not_valid'), { status: 'error' })
  if (message.includes('Введенная почта не принадлежит пользователю с данным именем'))
    notify(t('Email_not_valid'), { status: 'error' })
  if (message.includes('Необходимо указать код подтверждения')) notify(t('Code_required'), { status: 'error' })
  if (message.includes('Пользователь с таким именем пользователя не найден'))
    notify(t('User_not_found_by_username'), { status: 'error' })
  if (message.includes('Код не найден')) notify(t('Code_not_found'), { status: 'error' })
  if (message.includes('Срок действия кода истек')) notify(t('Code_is_expired'), { status: 'error' })
  if (message.includes('Неверный код подтверждения')) notify(t('Code_is_not_valid'), { status: 'error' })
  if (message.includes('Ваш email не подтвержден')) notify(t('Email_not_confirmed'), { status: 'error' })
  if (message.includes('Ваш телефон не подтвержден')) notify(t('Phone_not_confirmed'), { status: 'error' })
}
