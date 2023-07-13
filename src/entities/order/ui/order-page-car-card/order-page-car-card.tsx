import { useTranslate } from '@/shared/lib'
import Skeleton from 'react-loading-skeleton'
import { Button, Tooltip } from '@/shared/ui'
import { ProfileCarCard, getCarPrice, CarBase } from '@/entities/car'
import { FCWithClassName } from '@/shared/@types'

export interface OrderPageCarCardProps {
  car?: CarBase
  loading?: boolean
}

export const OrderPageCarCard: FCWithClassName<OrderPageCarCardProps> = ({ loading, className, car }) => {
  const { t } = useTranslate(['common'])

  return (
    <ProfileCarCard
      car={car}
      loading={loading}
      withHover={false}
      isOrderPage
      withoutIndicatorNotChecked
      className={className}
    >
      <p className='max-main:text-left max-main:col-span-3 text-center source-title'>
        {loading ? (
          <Skeleton />
        ) : (
          `${getCarPrice(car?.price?.rubValue || car?.price?.value, true, true, ' ') ?? ''} ${t('RUB')}`
        )}
      </p>
      {loading ? (
        <Skeleton />
      ) : (
        <Tooltip label={t('Go to machine page')} placement='bottom'>
          <Button
            fullWidth
            href={`/autos/${car?.id}`}
            variant='text'
            className='!justify-end source-mobile-sub-text main:source-secondary-title'
          >
            {t('More')}
          </Button>
        </Tooltip>
      )}
    </ProfileCarCard>
  )
}
