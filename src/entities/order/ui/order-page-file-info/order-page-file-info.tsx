import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'

export interface OrderPageFileInfoProps {
  loading?: boolean
}

export const OrderPageFileInfo: FCWithClassName<OrderPageFileInfoProps> = ({ className, loading }) => {
  const { t } = useTranslate(['car', 'order'])
  return (
    <div className={cn('rounded-large flex flex-col w-full shadow-panel', className)}>
      <div className='border-b p-5 flex flex-col gap-small'>
        {loading ? (
          <Skeleton />
        ) : (
          <p className='text-disabled main:croogla-sub-title croogla-mobile'>{t('order:InvoicesForPayment')}</p>
        )}
        <Button variant='download' loading={loading} newTab fullWidth>
          {t('order:Instruction')}
        </Button>
      </div>
      <div className='p-5 flex flex-col gap-small'>
        {loading ? <Skeleton /> : <p className='text-text main:source-text source-mobile-text'>{t('Car payment')}</p>}
        <Button variant='download' loading={loading} newTab fullWidth>
          {t('order:CarBill')}
        </Button>
      </div>
    </div>
  )
}
