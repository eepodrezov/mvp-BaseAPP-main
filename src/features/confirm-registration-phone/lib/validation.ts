import { TFunction } from '@/shared/@types'
import { NotificationModalData, notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const confirmCodeSchema = (t: TFunction) =>
  yup.object({
    code: yup.string().required(t('validRequiredField')).length(4, t('code must be 4 symbols')),
  })

export const serverSideConfirmCodeValidation = (
  t: TFunction,
  error?: AxiosError<any, any>,
  setNotificationModalData?: ({ status, payload }: NotificationModalData) => void,
  isConfirmEmail?: boolean
) => {
  switch (error?.response?.data.detail) {
    case 'Код не найден': {
      setNotificationModalData?.({
        status: 'error',
        payload: isConfirmEmail ? t('The link to activate your account has expired') : t('code not found'),
      })
      return
    }
    case 'телефон не найден': {
      notify(t('phone not found'), { status: 'error' })
      return
    }
    case 'Слишком частые запросы': {
      notify(t('Too frequent requests'), { status: 'error' })
      return
    }
    case 'вы уже запросили код, попробуйте позже': {
      notify(t('You have already requested the code, please try again later'), { status: 'error' })
      return
    }
    default: {
      notify(t('serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
