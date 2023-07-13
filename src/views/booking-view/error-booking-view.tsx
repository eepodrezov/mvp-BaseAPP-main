import { useTranslate } from '@/shared/lib'
import { FC } from 'react'
import CloseIcon from '@/shared/assets/icons/common/close-secondary.svg'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { signInModalAtom } from '@/features'

export const ErrorBookingView: FC = () => {
  const { t } = useTranslate(['booking', 'common'])
  const router = useRouter()
  const viewer = useAtomValue(viewerAtom)
  const { onOpen } = useModalState(signInModalAtom)

  const onClickPayAgain = () => (viewer ? router.push(`/booking/${router.query.id}`) : onOpen())

  const possibleReasons = [
    'Insufficient_funds_on_the_card',
    'Error_in_filling_details',
    'Time_has_elapsed_to_pay_for_the_service',
  ]

  return (
    <div className='flex w-full justify-center items-center flex-col pt-large desktop:pt-[50px] max-desktop:p-5'>
      <div className='w-full max-w-[530px] flex flex-col items-center desktop:gap-large gap-5'>
        <CloseIcon className='stroke-white fill-text' />
        <h1 className='croogla-secondary-text text-black max-desktop:text-center'>{t('booking:Booking_error')}</h1>
        <h1 className='text-text desktop:source-text source-mobile-text'>
          {t('booking:Unfortunately_the_Partner_Bank_was_unable_to_process_your_payment')}
        </h1>
        <div className='rounded-xl p-3 bg-gray w-full flex flex-col gap-small'>
          <p className='text-text desktop:source-text source-mobile-text'>{t('booking:Possible_reasons')}:</p>
          <ul className='list-disc ml-large'>
            {possibleReasons.map((reason, index) => (
              <li key={reason} className='text-text desktop:source-text source-mobile-text'>
                {t(`booking:${reason}`)}
                {index === possibleReasons.length - 1 ? '.' : ','}
              </li>
            ))}
          </ul>
          <p className='text-text desktop:source-text source-mobile-text'>{t('booking:Please_try_to_pay_again')}</p>
        </div>
        <div className='flex flex-col gap-medium mb-28'>
          <Button onClick={onClickPayAgain} className='!px-5'>
            {t('booking:Pay_again')}
          </Button>
          <Button variant='text' href='/'>
            {t('common:Back_to_catalog_booking_view')}
          </Button>
        </div>
      </div>
    </div>
  )
}
