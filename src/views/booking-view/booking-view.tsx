import { FC, useEffect } from 'react'
import { BookingPayment, WhatIsBooking } from '@/features/booking'
// TODO: Исправить, когда будет фикс тестов для esm
import { CarCard } from '@/entities/car/ui/car-card'
import { useRouter } from 'next/router'
import { useGetOrder } from '@/entities/order'
import { useGetCar } from '@/entities/car'
import { getNumberFromString } from '@/shared/helpers'
import { useUpdateAtom } from 'jotai/utils'
import { DeliveryCalculator, deliveryCarIdAtom } from '@/features/delivery'
import { useTranslate } from '@/shared/lib'
import HeaderArrowIcon from '@/shared/assets/icons/common/header-arrow.svg'
import { Button } from '@/shared/ui'
import { BaseEntity } from '@/shared/@types'
import { BlockedPagePlug } from '@/shared/ui'
import { useProtectRoute } from '@/features'

export const BookingView: FC = () => {
  useProtectRoute()
  const {
    query: { pid },
    push,
  } = useRouter()

  const { t } = useTranslate(['booking'])
  const setDeliveryCarId = useUpdateAtom(deliveryCarIdAtom)

  const orderId = getNumberFromString(pid as string)

  const {
    data: booking,
    isSuccess,
    isError,
  } = useGetOrder(orderId, {
    retry: false,
  })
  const carId = (booking?.car as BaseEntity)?.id

  const {
    data: car,
    isIdle,
    isLoading,
  } = useGetCar(carId, {
    enabled: !!carId,
  })

  useEffect(() => {
    carId && setDeliveryCarId(carId)
  }, [carId])

  if (!isLoading && isError) return <BlockedPagePlug text={t('Sorry! Order is not available!')} />

  return (
    <>
      <div className='flex items-center justify-between h-20 px-5 border-b border-black tablet:hidden'>
        {carId && (
          <Button variant='icon' onClick={() => push(`/autos/${carId}`)}>
            <HeaderArrowIcon className='fill-black' />
          </Button>
        )}
        <h1 className='text-black croogla-text'>{t('Booking a car')}</h1>
        <div />
      </div>
      <h1 className='hidden text-black desktop:block croogla-title mb-10 mt-[60px]'>{t('Booking a car')}</h1>
      <div className='grid grid-cols-1 main:grid-cols-[870px,_420px] auto-cols-max desktop:gap-large max-w-screen-main mb-6'>
        <CarCard
          car={car}
          type='page'
          loading={isIdle || isLoading}
          isBooking
          extraPageContent={
            <DeliveryCalculator
              price={car?.price}
              location={car?.location}
              withStar
              withTime
              className='px-5 pb-5 max-desktop:border-t max-desktop:border-black max-desktop:pt-5 max-desktop:mt-5 desktop:mt-3'
            />
          }
        />
        <BookingPayment
          orderId={orderId}
          disabled={!isSuccess}
          className={`w-full row-start-3 border-t main:col-start-2 desktop:rounded-large
       desktop:shadow-base main:row-start-1 border-t-black desktop:border-t-0 desktop:mb-0`}
        />
        <WhatIsBooking className='w-full border-t desktop:rounded-large desktop:shadow-base border-t-black desktop:border-t-0' />
      </div>
    </>
  )
}
