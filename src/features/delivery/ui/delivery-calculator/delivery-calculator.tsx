import { useEffect, useMemo } from 'react'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import { getNumberWithDevider } from '@/shared/helpers'
import { bookingCarPriceAtom, useGetDelivery } from '../../model'
import Skeleton from 'react-loading-skeleton'
import { InfoRow, Informer } from '@/shared/ui'
import { FCWithClassName } from '@/shared/@types'
import { getCarPrice, Location, Price } from '@/entities/car'
import { sum } from 'lodash'
import { serverSideValidationDeliveryCalculator } from '../../lib'
import { useUpdateAtom } from 'jotai/utils'

export interface DeliveryCalculatorProps {
  withTime?: boolean
  withStar?: boolean
  price?: Price
  location?: Location
}

export const DeliveryCalculator: FCWithClassName<DeliveryCalculatorProps> = ({
  withTime,
  withStar,
  price,
  location,
  className,
}) => {
  const { t } = useTranslate(['delivery', 'common', 'car'])
  const { data, isIdle, isLoading } = useGetDelivery({
    retry: false,
    onError: err => serverSideValidationDeliveryCalculator(t, err),
  })

  const loading = isIdle || isLoading

  const country = t('delivery:Russia')

  const finalPrice = sum([
    getCarPrice(price?.rubValue ?? price?.value, true, false),
    getCarPrice(data?.customClearance?.fullClearancePrice, true, false),
    data?.delivery.internationalDelivery,
    data?.delivery.domesticDelivery,
  ])

  const setBookingCarPrice = useUpdateAtom(bookingCarPriceAtom)
  useEffect(() => {
    data && setBookingCarPrice(data?.bookingPrice)
  }, [data])

  const currency = t('common:RUB')
  const calculatorItems = useMemo(
    () => [
      {
        title: t('delivery:Address'),
        text: country,
        textStyle: 'source-secondary-title',
        textStyleMobile: 'font-bold text-lg leading-[26px] font-source',
      },
      {
        title: t('delivery:Price'),
        text: `~${price?.rubValue ? getCarPrice(price?.rubValue, true) : price?.value} ${currency}`,
        subtext: price?.currency.name !== 'RUB' ? `${getCarPrice(price?.value)} ${price?.currency?.name || ''}` : null,
        textStyle: 'source-secondary-title',
        textStyleMobile: 'croogla-secondary-text',
        loading: loading,
      },
      {
        title: t('delivery:International_Delivery'),
        text: data?.delivery.internationalDelivery
          ? `${'~' + getNumberWithDevider(data?.delivery.internationalDelivery?.toFixed(0), ',')} ${currency}`
          : null,
        titleStyle: '!max-w-[170px]',
        textStyle: 'source-secondary-title',
        textStyleMobile: 'croogla-secondary-text',
        tooltipText: t('delivery:International_Delivery'),
        loading: loading,
      },
      {
        title: t('delivery:Customs_clearance'),
        text: data?.customClearance?.fullClearancePrice
          ? `~${getCarPrice(data?.customClearance.fullClearancePrice, true)} ${currency}`
          : null,
        textStyle: 'source-secondary-title',
        textStyleMobile: 'croogla-secondary-text',
        tooltipText: t('delivery:Customs_clearance'),
        loading: loading,
      },
      {
        title: t('delivery:Domestic_Delivery'),
        text: `~${getNumberWithDevider(data?.delivery.domesticDelivery.toFixed(0), ',')} ${currency}`,
        textStyle: 'source-secondary-title',
        textStyleMobile: 'croogla-secondary-text',
        tooltipText: t('delivery:Domestic_Delivery'),
        loading: loading,
      },
    ],
    [loading]
  )

  // пригодится для округления
  // const fullCarPrice = useMemo(() => {
  //   if (data?.delivery && data.carPrice) {
  //     return (
  //       data?.carPrice +
  //       data?.delivery.internationalDelivery +
  //       data?.customClearance.fullClearancePrice +
  //       data?.delivery.domesticDelivery
  //     )
  //   }
  // }, [data])
  return (
    // TODO: реализовать логику валют, когда будет на бэке
    <div className={cn('flex flex-col gap-[22px] text-black text-right desktop:max-tablet:text-start', className)}>
      {data || loading ? (
        <div className='flex flex-col gap-3'>
          {calculatorItems.map((item, index) =>
            item.loading ? (
              <Skeleton className='h-7' />
            ) : ((
                <InfoRow
                  {...item}
                  key={index}
                  className='desktop:flex-col desktop:gap-0 desktop:items-start tablet:flex-row'
                />
              )
            )
          )}
        </div>
      ) : (
        <>
          <InfoRow
            title={t('delivery:Price')}
            text={`~${getCarPrice(price?.rubValue || price?.value, true)} ${currency}`}
            className='desktop:flex-col desktop:gap-0 desktop:items-start tablet:flex-row'
          />
          <Informer>{t('Calculation_error')}</Informer>
        </>
      )}
      {data && loading ? (
        <Skeleton className='h-10' />
      ) : (
        data && (
          <div className='w-full croogla-secondary-title'>
            {`~${getNumberWithDevider(finalPrice)} ${t('common:RUB')}`}
            {withStar && '*'}
          </div>
        )
      )}
      {/* возможно пригодится 
      <div className='source-mobile-text desktop:source-text text-text'>
        {t('This cost is approximate and may vary depending on the method of delivery and exchange rates')}
      </div> */}
    </div>
  )
}
