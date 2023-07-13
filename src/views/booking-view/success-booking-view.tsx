import { useTranslate } from '@/shared/lib'
import { FC } from 'react'
import SuccessIcon from '@/shared/assets/icons/common/success-secondary.svg'
import WarningIcon from '@/shared/assets/icons/common/warning-icon.svg'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { signInModalAtom } from '@/features'
import { PROFILE_ORDERS_URL } from '@/widgets/profile-page-navbar'

export const SuccessBookingView: FC = () => {
  const { t } = useTranslate(['booking', 'common'])
  const router = useRouter()
  const viewer = useAtomValue(viewerAtom)
  const { onOpen } = useModalState(signInModalAtom)

  const onClickPersonalAccount = () => (viewer ? router.push(PROFILE_ORDERS_URL) : onOpen())

  return (
    <div className='flex w-full justify-center items-center flex-col pt-large desktop:pt-[50px] max-desktop:p-5'>
      <div className='w-full max-w-[530px] flex flex-col items-center desktop:gap-large gap-5'>
        <SuccessIcon className='stroke-white fill-green' />
        <h1 className='croogla-secondary-text text-black max-desktop:text-center'>
          {t('booking:Booking_prepayment_was_successful')}
        </h1>
        <div className='flex flex-col gap-small'>
          <p className='text-text desktop:source-text source-mobile-text'>
            {t(
              'booking:You_have_submitted_an_application_for_booking_a_car_and_our_staff_has_already_started_processing_it'
            )}
          </p>
          <p className='text-text desktop:source-text source-mobile-text'>
            {t('booking:The_AntCar_manager_will_contact_you_soon_to_clarify_all_the_details_of_the_order')}
          </p>
        </div>
        <div className='rounded-xl p-3 bg-gray w-full flex flex-col gap-small'>
          <div className='flex gap-small'>
            <WarningIcon className='stroke-white fill-red' />
            <p className='text-disabled desktop:source-text source-mobile-text'>{t('booking:Note')}</p>
          </div>
          <p className='text-text desktop:source-text source-mobile-text'>
            {t('booking:The_booking_of_this_vehicle_has_not_yet_been_completed')}
          </p>
          <p className='text-text desktop:source-text source-mobile-text'>
            {t('booking:If_it_fails_due_to_reasons_beyond_AntCar_control')}
          </p>
        </div>
        <div className='flex flex-col gap-medium mb-28'>
          <Button onClick={onClickPersonalAccount} className='!px-5'>
            {t('common:To_personal_account')}
          </Button>
          <Button variant='text' href='/'>
            {t('common:Back_to_catalog_booking_view')}
          </Button>
        </div>
      </div>
    </div>
  )
}
