import { User } from '@/entities/viewer'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import { TFunction } from 'next-i18next'

export type RequestChangePrivateInfo = Partial<Pick<User, 'email' | 'phone' | 'telegram'>> &
  Pick<User, 'id'> & { isRepeat?: boolean }

export const serverSideValidationPrivateInfo = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.detail) {
    case 'пользователь не найден': {
      notify(t('сommon:User_is_not_found'), { status: 'error' })
      return
    }
    case 'Отправлять код подтверждения можно раз в 2 минуты': {
      notify(t('common:You_can_send_a_confirmation_code_once_every_2_minutes'), { status: 'error' })
      return
    }
    case 'phone: Пользователь с таким номеров телефона уже существует': {
      notify(t('common:User_with_this_phone_number_already_exists'), { status: 'error' })
      return
    }
    case 'email: Пользователь с таким email уже существует': {
      notify(t('common:User_with_this_email_already_exists'), { status: 'error' })
      return
    }
    default: {
      notify(t('common:serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
