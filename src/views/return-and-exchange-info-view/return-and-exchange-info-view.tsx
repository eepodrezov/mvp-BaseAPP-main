import { FC } from 'react'
import { useTranslate } from '@/shared/lib'
import { InfoPageContentLayout } from '@/layouts'
import { Informer } from '@/shared/ui'

export const ReturnAndExchangeInfoView: FC = () => {
  const { t } = useTranslate(['return-and-exchange'])

  return (
    <InfoPageContentLayout title={t('Return and exchange')}>
      <p>
        {t('When you have chosen your dream car, the first step towards it is')}
        <span className='desktop:source-secondary-title source-mobile-sub-text'> {t('booking')}: </span>
        {t(
          'in fact, the most important part of the process. Booking ensures the reservation and cancellation of the selected car or model. However, sometimes unforeseen circumstances arise that may affect your decision and plans. In such cases, the possibility of free cancellation of a car reservation is a necessary condition that can help you avoid unwanted expenses.'
        )}
      </p>

      <p>
        {t('Our company understands that circumstances vary, and as such we offer free, refundable car cancellations')}
        <span className='desktop:source-secondary-title source-mobile-sub-text'> {t('within 72 hours')} </span>
        {t('since booking.')}
      </p>

      <Informer type='info' className='!max-w-full' textClassName='text-black'>
        {t(
          'You can book a car to make sure its available, but cancel your booking at no additional cost if necessary.'
        )}
      </Informer>

      <p>{t('In addition, we guarantee a refund to the card on which the amount for the booking was blocked.')}</p>

      <Informer type='info' className='!max-w-full' textClassName='text-black'>
        {t('You can be sure that the money will not be lost if you decide to change your plans.')}
      </Informer>

      <p>
        {t(
          'We are confident that our flexible booking and cancellation system will help you make the right decision without any worries. Our company is always ready to provide you with the best service and facilities to make your car purchase comfortable and safe. Book with us, buy a car, get the car and enjoy it!'
        )}
      </p>
    </InfoPageContentLayout>
  )
}
