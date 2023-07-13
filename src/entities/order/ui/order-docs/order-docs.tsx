import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'

export interface OrderDocsProps {
  loading?: boolean
  paymentInstruction?: string
  paymentInvoice?: string
}

export const OrderDocs: FCWithClassName<OrderDocsProps> = ({ className, loading, paymentInvoice }) => {
  const { t } = useTranslate(['car', 'order'])
  return (
    <div className={cn('rounded-large flex flex-col w-full shadow-panel', className)}>
      {/* TODO:Возможно понадобится */}
      {/* <div className={cn('p-5 flex flex-col gap-small', { 'border-b': paymentInstruction })}>
        {loading ? (
          <Skeleton />
        ) : (
          <p className='text-disabled main:croogla-sub-title croogla-mobile'>{t('order:InvoicesForPayment')}</p>
        )}
        {paymentInstruction && (
          <Button variant='download' loading={loading} newTab fullWidth href={paymentInstruction}>
            {t('order:Instruction')}
          </Button>
        )}
      </div> */}
      <div className='p-5 flex flex-col gap-small'>
        {loading ? <Skeleton /> : <p className='text-text main:source-text source-mobile-text'>{t('Car payment')}</p>}
        {paymentInvoice ? (
          <Button variant='download' loading={loading} newTab fullWidth href={paymentInvoice}>
            {t('order:CarBill')}
          </Button>
        ) : (
          !loading && (
            <p className='text-text source-text-mobile desktop:source-text'>
              {t('order:When_the_manager_processes_the_purchase_invoice_data_it_will_be_displayed_here')}
            </p>
          )
        )}
      </div>
    </div>
  )
}
