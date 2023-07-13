import { TFunction } from '@/shared/@types'
import { validateEmail } from '@/shared/helpers'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const registrationSchema = (t: TFunction, isValidateEmail: boolean) =>
  yup.object({
    username: yup.string().when({
      is: () => isValidateEmail,
      then: schema => schema.required(t('validRequiredField')).test('email', t('InvalidMail'), validateEmail),
      otherwise: schema => schema.required(t('validRequiredField')).min(11, t('InvalidPhone')),
    }),
    firstName: yup.string().required(t('validRequiredField')),
    lastName: yup.string().required(t('validRequiredField')),
    middleName: yup.string(),
    plainPassword: yup.string().required(t('validRequiredField')).min(8, t('min8symbols')),
    repeatPassword: yup
      .string()
      .required(t('validRequiredField'))
      .min(8, t('min8symbols'))
      .oneOf([yup.ref('plainPassword'), null], t('PasswordsMustMatch')),
    userAgreementConfirmation: yup.boolean().required(t('validRequiredField')).oneOf([true], t('validRequiredField')),
  })

export const serverSideRegistrationValidation = (
  t: TFunction,
  error?: AxiosError<any, any>,
  isFieldEmail?: boolean
) => {
  const message = error?.response?.data.detail
  if (error?.response?.status === 500) {
    notify(t('serverErrorMessage'), { status: 'error' })
    return
  }
  if (message.includes('username: Пользователь с таким именем уже существует'))
    notify(t(`This ${isFieldEmail ? 'email' : 'phone number'} is already in use`), { status: 'error' })
  // TODO:Изменить как бек изменит текстовку на plainPassword:min 8 symbols
  if (message.includes('plainPassword: min 5 symbols')) notify(t('min8symbols'), { status: 'error' })
  if (message.includes('plainPassword: max 30 symbols')) notify(t('max30symbols'), { status: 'error' })
  if (message.includes('phone: Значение недопустимо.')) notify(t('Phone number is invalid'), { status: 'error' })
  if (message.includes('Слишком частые запросы')) notify(t('Too frequent requests'), { status: 'error' })
}
