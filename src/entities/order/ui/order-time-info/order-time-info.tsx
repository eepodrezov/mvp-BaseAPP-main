import { useMemo } from 'react'
import { useTranslate } from '@/shared/lib'
import { useTimerDown } from '@/shared/hooks'
import { FCWithClassName, Nullable } from '@/shared/@types'
import cn from 'classnames'
import dayjs from 'dayjs'
import { DEFAULT_DATE_FORMAT } from '@/shared/config'
import Skeleton from 'react-loading-skeleton'

export interface OrderTimeInfoProps {
  dateUpdate?: string
  payTime?: number
  loading?: boolean
}

export const OrderTimeInfo: FCWithClassName<OrderTimeInfoProps> = ({ dateUpdate, payTime, loading, className }) => {
  const { t } = useTranslate(['car'])

  const { payTimerHour, payTimeMinute, payTimeSecond } = useMemo(() => {
    const dateWithViewerToPay = dayjs(dateUpdate)
      .utc()
      .add(payTime ?? 0, 'h')
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
  }, [dateUpdate])

  const { formatedDelayWithUnitsAndHours, seconds } = useTimerDown(
    payTimerHour * 3600 + payTimeMinute * 60 + payTimeSecond,
    {
      hours: t('h'),
      minutes: t('min'),
      seconds: t('sec'),
    }
  )

  if (!dateUpdate && !loading) return null

  const timeToBuy = seconds ? formatedDelayWithUnitsAndHours : null

  const renderInfo = (name: string, value?: Nullable<string>) =>
    loading ? (
      <Skeleton className='!w-40' />
    ) : (
      <>
        <p className='source-mobile-text main:source-text'>{name}</p>
        <p className='source-mobile-title main:source-secondary-title'>{value}</p>
      </>
    )

  return (
    <div className={cn('w-full flex justify-between items-center flex-wrap gap-small main:gap-large', className)}>
      <div className='text-red flex gap-2.5'>{renderInfo(t('Pay the bill'), timeToBuy)}</div>
      <div className='flex gap-2.5'>{renderInfo(t('Deal start'), dayjs(dateUpdate).format(DEFAULT_DATE_FORMAT))}</div>
    </div>
  )
}
