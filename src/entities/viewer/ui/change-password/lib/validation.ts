import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const changePasswordSchema = (t: TFunction) =>
  yup.object({
    oldPassword: yup.string().required(t('common:validRequiredField')).min(8, t('common:min8symbols')),
    newPassword: yup.string().required(t('common:validRequiredField')).min(8, t('common:min8symbols')),
    repeatPassword: yup
      .string()
      .required(t('common:validRequiredField'))
      .min(8, t('common:min8symbols'))
      .oneOf([yup.ref('newPassword'), null], t('common:PasswordsMustMatch')),
  })

export const serverSideChangePasswordValidation = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data.detail) {
    case 'Неверный старый пароль': {
      notify(t('common:The_current_password_is_not_correct'), { status: 'error' })
      return
    }
    case 'Новый и старый пароли совпадают': {
      notify(t('New and old passwords are the same'), { status: 'error' })
      return
    }
    case 'Пароль должен быть не более 30 символов': {
      notify(t('common:max30symbols'), { status: 'error' })
      return
    }
    case 'Слишком частые запросы': {
      notify(t('common:Too frequent requests'), { status: 'error' })
      return
    }
    default: {
      notify(t('common:serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
