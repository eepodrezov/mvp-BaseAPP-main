import { TFunction } from '@/shared/@types'
import { notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import * as yup from 'yup'

export const payBookingShema = (t: TFunction) =>
  yup.object({
    bookingTerms: yup.boolean().isTrue(''),
  })

export const serverSideBookingPayValidation = (t: TFunction, error?: AxiosError<any, any>) => {
  switch (error?.response?.data?.detail) {
    case 'Заказ уже оплачен': {
      notify(t('booking:Order_already_paid'), { status: 'error' })
      return
    }
    case 'Отсутствуют неоплаченные шаги': {
      notify(t('booking:No_Unpaid_Steps'), { status: 'error' })
      return
    }
    case 'Данный автомобиль недоступен для бронирования': {
      notify(t('booking:This_car_is_not_available_for_booking'), { status: 'error' })
      return
    }
    default: {
      notify(t('serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
