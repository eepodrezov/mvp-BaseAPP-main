import { FC } from 'react'
import { useTranslate } from '@/shared/lib'
import { InfoPageContentLayout } from '@/layouts'
import HeaderLogo from '@/shared/assets/icons/common/header-logo.svg'
import { Paragraph } from './paragraph'

export const CompanyInfoView: FC = () => {
  const { t } = useTranslate(['company'])

  return (
    <InfoPageContentLayout title={t('Сompany')} className='gap-large'>
      <HeaderLogo className='self-start w-[204px] h-8 fill-black' />
      <p className='px-3 py-2.5 bg-gray rounded-xl'>
        <span className='min-[1280px]:source-secondary-title source-mobile-sub-text'>ANTCAR - </span>
        {t(
          'is a convenient digital service for searching, booking, paying and delivering cars directly from dealers abroad, providing a seamless and convenient experience for customers looking for an easy way to select, order and receive cars without any hassle and only through bank transfer. With a wide selection of vehicle models and options available from dealers in various locations, ANTCAR ensures that customers can find a vehicle that suits their specific needs and preferences.'
        )}
      </p>

      <p className='self-start croogla-mobile min-[1280px]:croogla-text'>{t('Service features')}</p>

      <Paragraph title={t('1.Easy to use.')}>
        {t(
          'One of the key features of ANTCAR is the easy-to-use booking system. Cars are available to customers on the ANTCAR website or mobile application, allowing them to choose the exact car that fully meets the necessary requirements and book it in just a few clicks. It doesnt matter if the car is new or used - the high demands on the condition of the car ensure a choice of exclusively tested cars.'
        )}
      </Paragraph>

      <Paragraph title={t('2.Convenient delivery control.')}>
        {t(
          'Another outstanding feature of ANTCAR is the delivery control service. Customers always know what is happening with their car from the moment of booking to the moment of receipt. This eliminates worries and uncertainty - just how to track the package.'
        )}
      </Paragraph>

      <Paragraph title={t('3.A wide range of additional services.')}>
        {t(
          'In addition to search, booking, payment and delivery services, ANTCAR also offers a range of other services to make the car buying experience as smooth and enjoyable as possible. This includes 24/7 customer support, insurance and paperwork options, upgrades and service, all to give our customers confidence and simplicity. Buying a car through the ANTCAR service is as easy as ordering food delivery or buying a tour.'
        )}
      </Paragraph>

      <Paragraph title={t('4.Flexibility.')}>
        {t(
          'ANTCARs strategy is based on providing a fast way to purchase vehicles that focuses on convenience, flexibility and customer satisfaction. Offering a wide range of vehicles available from dealers, realistic delivery times, flexible payment methods that eliminate exchange rate risks, full legal support at all stages of purchase and delivery, ANTCAR can satisfy the diverse needs and preferences of customers.'
        )}
      </Paragraph>

      <Paragraph title={t('5.Cashless payment.')}>
        {t(
          'ANTCAR is the only cashless car search, booking, purchase and delivery service that combines convenience, flexibility and quality to deliver an exceptional customer experience.'
        )}
      </Paragraph>
    </InfoPageContentLayout>
  )
}
