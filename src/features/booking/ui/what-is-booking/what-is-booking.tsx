import { useTranslate } from '@/shared/lib'
import { AttentionText } from '@/shared/ui'
import cn from 'classnames'
import QuestionMarkIcon from '@/shared/assets/icons/common/question-mark.svg'
import { FCWithClassName } from '@/shared/@types'
import { useAtomValue } from 'jotai'
import { bookingCarPriceAtom } from '@/features/delivery'
import { getCarPrice } from '@/entities/car'

export const WhatIsBooking: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['booking', 'common'])
  const bookingCarPrice = useAtomValue(bookingCarPriceAtom)
  return (
    <div className={cn('flex flex-col gap-5 p-5 text-black source-mobile-text desktop:source-text', className)}>
      <p className='flex gap-3 croogla-secondary-text'>
        <QuestionMarkIcon className='fill-black' />
        {t('What is Booking?')}
      </p>
      <div className='flex flex-col gap-small leading-[150%]'>
        <p>{t('There are five stages in total')}:</p>
        <ul className='pl-2 source-sub-title desktop:source-sub-title'>
          <li>{t('1. Booking.')}</li>
          <li>{t('2. Car payment.')}</li>
          <li>{t('3. Payment for the delivery of the car to the customs post.')}</li>
          <li>{t('4. Payment of customs duties.')}</li>
          <li>{t('5. Payment for the local delivery to you personally, wherever you are.')}</li>
        </ul>
        <p>{t('Now you are at the first stage.')}</p>
        <p>
          {`${t('You need to deposit an amount of')} ${getCarPrice(bookingCarPrice)} ${t(
            'Rubles, and we will guide you through every step of the way.'
          )}`}
        </p>
      </div>
      <AttentionText
        type='important'
        text={`${t('The amount of')} ${getCarPrice(bookingCarPrice)} ${t(
          'Rubles is deducted from the final cost of the car.'
        )}`}
      />
      <AttentionText
        type='attention'
        text={t(
          'The booking is valid for 72 hours. Further, the car you have chosen will be returned to sale again, and the booking service will be considered as fulfilled.'
        )}
        className='!items-start'
      />
    </div>
  )
}
