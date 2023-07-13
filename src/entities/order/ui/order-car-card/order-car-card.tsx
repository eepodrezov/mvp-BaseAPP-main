import { ProfileCarCard } from '@/entities/car'
import { notify, OptionalLinkWrapper, queryClientAtom, useTranslate } from '@/shared/lib'
import { Modal, Tooltip, TrancateContainer } from '@/shared/ui'
import cn from 'classnames'
import dayjs from 'dayjs'
import {
  getOrderStatus,
  getOrderStep,
  OrderCar,
  ORDERS_COLLECTION_PRIMARY_KEY,
  ORDER_STATUS_DELETING,
  ORDER_STATUS_USER_PAYMENT,
  ORDER_STATUS_WITH_LINK,
  STATUS_BOOKING_WAITING_FOR_PAYMENT,
  STATUS_LOCAL_DELIVERY_SUCCESS,
  VIEWER_TIME_TO_PAY_IN_MINUTES,
} from '../../lib'
import { useDeleteOrder } from '../../model'
import { HelpMenuCard } from '../help-menu-card'
import { FC, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useTimerDown } from '@/shared/hooks'
import { AreYouSure } from '@/entities/viewer'
import { useAtomValue } from 'jotai'
import { DEFAULT_DATE_FORMAT } from '@/shared/config'

export interface OrderCarCardProps {
  order?: OrderCar
  loading?: boolean
  href?: string
}

export const OrderCarCard: FC<OrderCarCardProps> = ({ order, href, loading }) => {
  const { t } = useTranslate(['order', 'car'])
  const dateUpdate = order?.currentStep.currentStatus.dateUpdate
  const queryClient = useAtomValue(queryClientAtom)
  const [isSureModalOpen, setIsSureModalOpen] = useState(false)

  const { mutate: deleteOrder } = useDeleteOrder({
    onSuccess: () => {
      setIsSureModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ORDERS_COLLECTION_PRIMARY_KEY })
      notify(t('Order successfully deleted'))
    },
    onError: () => {
      notify(t('Unable to delete order, please try again later'), { status: 'error' })
    },
  })

  const { payTimeMinute, payTimeSecond } = useMemo(() => {
    const dateWithViewerToPay = dayjs(dateUpdate).utc().add(VIEWER_TIME_TO_PAY_IN_MINUTES, 'm')
    const passedTime = dateWithViewerToPay.diff(dayjs().utc())
    const delayTime = passedTime > 0 ? passedTime : 0
    const payTimerHour = dayjs(delayTime).utc().hour()
    const payTimeMinute = dayjs(delayTime).utc().minute()
    const payTimeSecond = dayjs(delayTime).utc().second()

    return {
      payTimerHour,
      payTimeMinute,
      payTimeSecond,
    }
  }, [order])

  const { formatedDelayWithUnits, seconds } = useTimerDown(payTimeMinute * 60 + payTimeSecond, {
    minutes: t('car:min'),
    seconds: t('car:sec'),
  })

  if (!order && !loading) return null

  const timeToBuy = seconds ? formatedDelayWithUnits : null
  const status = order?.currentStep.currentStatus.status
  const dateCreate = order?.currentStep.dateCreate
  const isDeleted = status && ORDER_STATUS_DELETING.includes(status)
  const withLink =
    (timeToBuy && status === STATUS_BOOKING_WAITING_FOR_PAYMENT) || (status && ORDER_STATUS_WITH_LINK.includes(status))
  const isNeedToPayUser = status && ORDER_STATUS_USER_PAYMENT.includes(status)
  const isDelivered = status === STATUS_LOCAL_DELIVERY_SUCCESS
  // TODO:Заменить как поле будет на беке
  const isChecked = false

  const classNameStatus = {
    'text-red': !isDeleted && !isDelivered,
    'text-text': isDeleted,
    'text-border': isDelivered,
  }

  return (
    <OptionalLinkWrapper {...(!!withLink && { href })}>
      <ProfileCarCard
        withoutIndicatorNotChecked={isChecked || loading}
        isDeleted={isDeleted || (!timeToBuy && status === STATUS_BOOKING_WAITING_FOR_PAYMENT)}
        loading={loading}
        isOrders
        {...order}
      >
        <p className='col-span-2 pt-0.5 source-mobile-sub-text main:source-sub-title main:col-span-1 text-end main:text-center'>
          {loading ? (
            <Skeleton />
          ) : (
            <Tooltip label={dayjs(dateCreate).format(`${DEFAULT_DATE_FORMAT} HH:mm:ss`)}>
              <p>{dayjs(dateCreate).format(DEFAULT_DATE_FORMAT)}</p>
            </Tooltip>
          )}
        </p>
        {/* Возможно пригодится
         {isDeleted ? (
          <Button
            variant='text'
            onClick={e => [e.preventDefault(), setIsSureModalOpen(true)]}
            disabled={isLoading}
            className='main:!justify-center col-span-2 main:col-span-1 !static !justify-start'
            childrenClassName='flex gap-small'
          >
            <DeleteIcon className='stroke-currentColor' />
            {t('Delete')}
          </Button>
        ) : ( */}
        <p className='text-text text-start max-main:col-span-2 font-bold source-mobile-text main:source-text main:font-semibold main:text-center'>
          {loading ? <Skeleton /> : isDelivered || (order && getOrderStep(order?.currentStep.type, t))}
        </p>
        {/* )} */}
        <span className='flex col-span-2 items-center gap-4 justify-end main:hidden'>
          {loading ? (
            <Skeleton className='!w-[120px]' />
          ) : (
            <TrancateContainer
              maxWidth={160}
              className={cn('text-center source-mobile-text', classNameStatus)}
              childrenClassName={cn({ 'flex gap-2': isNeedToPayUser })}
            >
              {getOrderStatus(t, status)}
            </TrancateContainer>
          )}
          {loading ? <Skeleton className='!w-5 h-5' /> : <HelpMenuCard className='!justify-end' />}
        </span>
        {loading ? (
          <Skeleton className='max-main:!hidden' />
        ) : (
          <TrancateContainer
            maxWidth={145}
            className='text-center hidden main:inline'
            childrenClassName={cn(classNameStatus)}
          >
            {getOrderStatus(t, status)}
          </TrancateContainer>
        )}
        {loading ? <Skeleton className='!w-5 h-5 max-main:!hidden' /> : <HelpMenuCard className='hidden main:!block' />}
      </ProfileCarCard>
      <Modal isOpen={isSureModalOpen} onClose={() => setIsSureModalOpen(false)}>
        <AreYouSure
          handleClose={() => {
            deleteOrder(order!.id)
          }}
          onClose={() => setIsSureModalOpen(false)}
        >
          {t('The order will be deleted')}
        </AreYouSure>
      </Modal>
    </OptionalLinkWrapper>
  )
}
