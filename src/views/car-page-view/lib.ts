import { TFunction } from '@/shared/@types'
import { NotificationModalData, notify } from '@/shared/lib'
import { AxiosError } from 'axios'
import { NextRouter } from 'next/router'

export const serverSideValidationOrderCreate = (
  t: TFunction,
  error?: AxiosError<any, any>,
  setNotificationModalData?: ({ status, payload, onAfterClose }: NotificationModalData) => void,
  router?: NextRouter
) => {
  if (error?.response?.status === 429) {
    setNotificationModalData?.({
      status: 'error',
      payload: t('booking:You_have_booked_too_many_cars_please_wait_20_minutes_before_booking.'),
    })
    return
  }
  switch (error?.response?.data.detail) {
    case 'Данную машину не возможно оформить.': {
      setNotificationModalData?.({
        status: 'error',
        payload: t('booking:Sorry_this_car_is_no_longer_available_for_booking'),
        onAfterClose: () => router?.push('/'),
      })
      return
    }
    case 'Автомобиль больше не доступен для продажи.': {
      setNotificationModalData?.({
        status: 'error',
        payload: t('booking:The_car_is_no_longer_available_for_sale.'),
      })
      return
    }
    case 'Автомобиль уже был забронирован другим клиентом.': {
      setNotificationModalData?.({
        status: 'error',
        payload: t('booking:The_car_has_already_been_booked_by_another_customer.'),
      })
      return
    }
    default: {
      notify(t('serverErrorMessage'), { status: 'error' })
      return
    }
  }
}
