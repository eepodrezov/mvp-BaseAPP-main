import { useMemo } from 'react'
import { useTranslate } from '@/shared/lib'
import { useTimerDown } from '@/shared/hooks'
import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import dayjs from 'dayjs'
import { DEFAULT_DATE_FORMAT } from '@/shared/config'
import { renderInfo } from './render-info'

export interface OrderTimeInfoProps {
  orderDateCreate?: string
  stepDateCreate?: string
  payTime?: number
  loading?: boolean
  onlyTimer?: boolean
  withTimer?: boolean
}

export const OrderTimeInfo: FCWithClassName<OrderTimeInfoProps> = ({
  stepDateCreate,
  orderDateCreate,
  payTime,
  withTimer,
  loading,
  className,
  onlyTimer = false,
}) => {
  const { t } = useTranslate(['car'])

  const { payTimeDay, payTimerHour, payTimeMinute, payTimeSecond } = useMemo(() => {
    const dateWithViewerToPay = dayjs(stepDateCreate)
      .utc()
      .add(payTime ?? 0, 'h')
    const passedTime = dateWithViewerToPay.diff(dayjs().utc())
    const delayTime = passedTime > 0 ? passedTime : 0
    const payTimeDay = dayjs(delayTime).utc().date()
    const payTimerHour = dayjs(delayTime).utc().hour()
    const payTimeMinute = dayjs(delayTime).utc().minute()
    const payTimeSecond = dayjs(delayTime).utc().second()

    return {
      payTimeDay,
      payTimerHour,
      payTimeMinute,
      payTimeSecond,
    }
  }, [stepDateCreate])

  const { formatedDelayWithUnitsAndHours, seconds } = useTimerDown(
    (payTimeDay && payTimeDay - 1) * 86400 + payTimerHour * 3600 + payTimeMinute * 60 + payTimeSecond,
    {
      hours: t('h'),
      minutes: t('min'),
      seconds: t('sec'),
    }
  )

  if (!stepDateCreate && !orderDateCreate && !loading) return null

  const timeToBuy = seconds ? formatedDelayWithUnitsAndHours : null

  return (
    <div className={cn('w-full flex justify-between items-center flex-wrap gap-small main:gap-large', className)}>
      {(withTimer || onlyTimer) && (
        <div className='text-red flex gap-2.5'>{renderInfo(t('Pay the bill'), timeToBuy, loading, !onlyTimer)}</div>
      )}
      {!onlyTimer && (
        <div className='flex gap-2.5'>
          {renderInfo(t('Deal start'), dayjs(orderDateCreate).format(DEFAULT_DATE_FORMAT), loading)}
        </div>
      )}
    </div>
  )
}
