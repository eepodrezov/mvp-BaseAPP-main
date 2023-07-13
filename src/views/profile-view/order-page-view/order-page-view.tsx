import { CarCatalogPlug, useGetCar } from '@/entities/car'
import {
  orderCallbackModalAtom,
  OrderPageCarCard,
  OrderDocs,
  OrderStatusCard,
  OrderTimeInfo,
  serverSideCallbackValidation,
  useGetOrder,
  useOrderCallback,
  useDocumentsCollection,
  ORDER_STATUS_USER_PAYMENT,
} from '@/entities/order'
import { useProtectRoute } from '@/features'
import { getNumberFromString } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'
import { FC } from 'react'
import ArrowIcon from '@/shared/assets/icons/car-overview/arrow-order-page.svg'
import PhoneMenuIcon from '@/shared/assets/icons/common/phone-icon.svg'
import { useModalState } from '@/shared/hooks'
import { useGetStep } from '@/entities/order/model/order-step-single-query'

export const OrderPageView: FC = () => {
  useProtectRoute()

  const {
    query: { id },
  } = useRouter()

  const orderId = getNumberFromString(id as string)

  const { onOpen: onOpenCallback } = useModalState(orderCallbackModalAtom)
  const { t } = useTranslate(['order', 'car', 'common'])

  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
  } = useGetOrder(orderId, {
    enabled: !!orderId,
    retry: false,
  })

  const carId = order?.car?.id

  const {
    data: car,
    isLoading: isLoadingCar,
    isFetching: isFetchingCar,
  } = useGetCar(carId!, {
    enabled: !!carId,
    retry: false,
  })

  const { mutate, isLoading: isLoadingCallback } = useOrderCallback({
    onSuccess: onOpenCallback,
    onError: error => serverSideCallbackValidation(t, error),
  })

  const { data: step, isLoading: isStepLoading } = useGetStep(order?.currentStep.id || 0)

  const { data: document, isLoading: isDocumentLoading, isIdle: isIdleDocument } = useDocumentsCollection(step?.id)

  // TODO: Возможно понадобится
  // const {
  //   data: payment,
  //   isLoading: isPaymentInstructionLoading,
  //   isIdle: isIdlePayment,
  // } = usePaymentInstructionCollection(step?.id)

  const isFetching = isFetchingOrder || isFetchingCar

  const isLoading = isLoadingCar || isLoadingOrder || isFetching

  const isDataEmpty = (isErrorOrder || !order?.id) && !isFetching && !isFetching

  const loadingDocs = isDocumentLoading || isIdleDocument

  const orderIsAwaitPayment = order && ORDER_STATUS_USER_PAYMENT.includes(order.status)

  const paymentInvoice = document?.items[0]?.file.pathS3

  // const paymentInstruction = payment?.items[0]?.file.pathS3

  if (isDataEmpty) return <CarCatalogPlug notFoundText={t('car:car_not_found')} />

  return (
    <div className='main:pl-10 pt-large px-5 pb-[34px]'>
      <div className='max-main:flex-col max-main:gap-base max-main:items-start main:mb-5 w-full flex justify-between mb-small max-w-[1078px]'>
        <Button
          variant='text'
          className='max-main:mb-base'
          childrenClassName='flex gap-small items-center'
          href='/profile/orders'
        >
          <ArrowIcon className='fill-currentColor' />
          {t('BackToOrders')}
        </Button>
        {order?.dateCreate && step?.currentStatus?.dateCreate && (
          <OrderTimeInfo
            withTimer={orderIsAwaitPayment}
            loading={isLoading}
            orderDateCreate={order?.dateCreate}
            stepDateCreate={step?.currentStatus?.dateCreate}
            payTime={72}
            className='max-main:items-start max-main:flex-col max-w-fit'
          />
        )}
      </div>
      <OrderPageCarCard loading={isLoading} car={car} className='main:mb-large mb-base' />
      <div className='main:gap-large flex gap-base max-w-[1078px]'>
        <div className='main:items-end flex flex-col gap-5 w-full items-center'>
          <OrderStatusCard step={step} loading={isLoading || isStepLoading} />
          {orderIsAwaitPayment && (
            <OrderDocs
              loading={loadingDocs}
              className='main:hidden'
              // paymentInstruction={paymentInstruction}
              paymentInvoice={paymentInvoice}
            />
          )}
          <Button
            onClick={() => mutate(orderId)}
            variant='text'
            loading={isLoadingCallback}
            childrenClassName='flex gap-small items-center'
          >
            <PhoneMenuIcon className='fill-currentColor' />
            {t('ContactManager')}
          </Button>
        </div>
        {orderIsAwaitPayment && (
          <OrderDocs
            loading={loadingDocs}
            className='max-main:hidden max-w-[384px]'
            // paymentInstruction={paymentInstruction}
            paymentInvoice={paymentInvoice}
          />
        )}
      </div>
    </div>
  )
}
