import { useTranslate } from '@/shared/lib'
import { ORDER_PAGE_STATUS_TEXT, STATUS_PAYMENT_WAITING_FOR_USER_PAYMENT, Step } from '../../lib'
import HelpIcon from '@/shared/assets/icons/car-overview/help.svg'
import { Button, Tooltip } from '@/shared/ui'
import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { OrderTimeInfo } from '../order-time-info'

export interface OrderStatusCardProps {
  step?: Step
  loading?: boolean
}

export const OrderStatusCard: FCWithClassName<OrderStatusCardProps> = ({ step, loading, className }) => {
  const { t } = useTranslate(['order', 'car'])

  return (
    <div className={cn('w-full p-5 flex flex-col gap-2.5 rounded-large shadow-panel', className)}>
      <div className='flex justify-between items-center'>
        <p className='source-mobile-text main:source-text text-disabled'>{t('order:Order_status')}</p>
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
        <p className='croogla-secondary-text font-normal flex items-start gap-2'>
          {step?.currentStatus?.status && t(ORDER_PAGE_STATUS_TEXT[step.currentStatus.status])}
          {step?.currentStatus?.status === STATUS_PAYMENT_WAITING_FOR_USER_PAYMENT && (
            <OrderTimeInfo
              onlyTimer
              loading={loading}
              stepDateCreate={step?.currentStatus.dateCreate}
              payTime={72}
              className='max-w-fit'
            />
          )}
        </p>
      )}
    </div>
  )
}
