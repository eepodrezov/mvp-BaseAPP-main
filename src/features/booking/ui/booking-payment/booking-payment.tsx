import { usePayOrder } from '@/entities/order'
import { Form, useTranslate } from '@/shared/lib'
import { Button, ButtonMobileFixedWrapper, Checkbox } from '@/shared/ui'
import { useRouter } from 'next/router'
import { payBookingShema, serverSideBookingPayValidation } from '../../lib'
import { TECHNICAL_SUPPORT } from '@/shared/config'
import cn from 'classnames'
import Link from 'next/link'
import AlertIcon from '@/shared/assets/icons/common/alert.svg'
import PhoneIcon from '@/shared/assets/icons/common/phone.svg'
import { FCWithClassName } from '@/shared/@types'
import { useAtomValue } from 'jotai'
import { bookingCarPriceAtom } from '@/features/delivery'
import { getCarPrice } from '@/entities/car'

export interface BookingPaymentProps {
  orderId?: number
  disabled?: boolean
}

export const BookingPayment: FCWithClassName<BookingPaymentProps> = ({ orderId, disabled, className }) => {
  const { t } = useTranslate(['common', 'booking'])
  const router = useRouter()
  const bookingCarPrice = useAtomValue(bookingCarPriceAtom)

  const { mutate, isLoading } = usePayOrder({
    onSuccess: data => router.push(data.paymentURL),
    onError: error => serverSideBookingPayValidation(t, error),
  })

  const bookingButtonText = `${t('booking:Booking')} ${t('for')} ${getCarPrice(bookingCarPrice)} ${t('RUB')}`

  return (
    <Form
      validationSchema={payBookingShema(t)}
      onSubmit={() => mutate(orderId!)}
      formParams={{ mode: 'onChange' }}
      className={cn(
        'flex flex-col gap-5 bg-white p-5 text-black source-mobile-text desktop:source-text h-fit',
        className
      )}
    >
      {({ formState: { isValid } }) => (
        <>
          <p className='hidden desktop:block croogla-sub-title'>{t('booking:Booking_payment')}</p>
          <Checkbox
            name='bookingTerms'
            label={
              <span>
                {`${t('I agree with')} ${t('the')} `}
                <Link href=''>
                  <a>{t('Terms of Service')}</a>
                </Link>
                {` ${t('and')} ${t('the')} `}
                <Link href=''>
                  <a>{t('Terms of Data Processing')}</a>
                </Link>
              </span>
            }
          />
          <Button
            type='submit'
            className='hidden desktop:flex desktop:min-h-[60px]'
            childrenClassName='croogla-sub-title'
            fullWidth
            disabled={!isValid || disabled}
            loading={isLoading}
          >
            {bookingButtonText}
          </Button>
          {isValid && (
            <ButtonMobileFixedWrapper type='submit' fullWidth disabled={disabled}>
              {bookingButtonText}
            </ButtonMobileFixedWrapper>
          )}
          <p className='flex items-center gap-small'>
            <AlertIcon className='flex-shrink-0 fill-red' />
            {t('booking:Booking_is_the_first_stage_of_buying_your_car')}
          </p>
          <p className='text-text'>
            {t(
              'booking:We_will_assign_this_car_to_you_and_remove_it_from_sale_for_72_hours._Further,_our_manager_will_contact_you,_and_describe_the_procedures'
            )}
          </p>
          <p
            className={cn('flex gap-small', {
              'mb-20 desktop:mb-0': isValid,
            })}
          >
            <PhoneIcon className='flex-shrink-0 stroke-black' />
            <span>
              {t('booking:If_you_have_any_questions_please_contact_our_Customer_support')}{' '}
              <span className='source-secondary-title'>{TECHNICAL_SUPPORT || ''}</span>
            </span>
          </p>
          <p className='text-text'>* {t('booking:The_price_is_not_a_public_offer')}</p>
        </>
      )}
    </Form>
  )
}
