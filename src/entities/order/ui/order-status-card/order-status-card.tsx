import { useTranslate } from '@/shared/lib'
import { ORDER_PAGE_STATUS_TEXT, PaymentStatus } from '../../lib'
import HelpIcon from '@/shared/assets/icons/car-overview/help.svg'
import { Button, Tooltip } from '@/shared/ui'
import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'

export interface OrderStatusCardProps {
  orderId?: PaymentStatus
  loading?: boolean
}

export const OrderStatusCard: FCWithClassName<OrderStatusCardProps> = ({ orderId, loading, className }) => {
  const { t } = useTranslate(['order'])
  return (
    <div className={cn('w-full p-5 flex flex-col gap-2.5 rounded-large shadow-panel', className)}>
      <div className='flex justify-between items-center'>
        <p className='source-mobile-text main:source-text text-disabled'>{t('Order status')}</p>
        <Tooltip label={t('Help page in development')}>
          <Button variant='text' childrenClassName='flex gap-small'>
            <HelpIcon className='stroke-currentColor' />
            {t('Help')}
          </Button>
        </Tooltip>
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <p className='croogla-secondary-text font-normal'>{orderId && t(ORDER_PAGE_STATUS_TEXT[orderId])}</p>
      )}
    </div>
  )
}
