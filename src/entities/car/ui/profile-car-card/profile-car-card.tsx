import cn from 'classnames'
import { IndicatorNotChecked } from '@/shared/assets/icons/car-overview'
import { useTranslate } from '@/shared/lib'
import { NextImage } from '@/shared/ui'
import Skeleton from 'react-loading-skeleton'
import { FCWithChildren } from '@/shared/@types'
import { ProfileCar, getFirstImage } from '../../lib'
import { normalizeArrayToSeparatedString } from '@/shared/helpers'
import dayjs from 'dayjs'
import { getCarImage } from '../../lib/get-car-image'

export interface ProfileCarCardProps {
  isDeleted?: boolean
  isFavorites?: boolean
  withHover?: boolean
  isStock?: boolean
  isOrderPage?: boolean
  loading?: boolean
  car?: ProfileCar
  withoutIndicatorNotChecked?: boolean
  isOrders?: boolean
}

export const ProfileCarCard: FCWithChildren<ProfileCarCardProps> = ({
  loading,
  isDeleted,
  isFavorites,
  isOrders,
  isOrderPage,
  isStock,
  withHover = true,
  children,
  className = '',
  car,
  withoutIndicatorNotChecked,
}) => {
  const { t } = useTranslate(['car'])
  if (!car && !loading) return null
  const descriptionCar = [
    dayjs(car?.firstRegDate).format('YYYY'),
    `${car?.enginePower} ${t('HP')}`,
    `${car?.literEngineVolume} ${t('L')}`,
  ]

  return (
    <div
      className={cn('flex items-center gap-small', {
        'main:max-w-[1078px]': isOrderPage,
        'main:max-w-[1100px] ': !isOrderPage,
      })}
    >
      {!isOrderPage && (
        <IndicatorNotChecked className={cn('hidden main:inline', { invisible: withoutIndicatorNotChecked })} />
      )}
      <div
        className={cn(
          `w-full pl-small pr-3 py-small main:py-1.5 main:pl-1.5 main:gap-5 grid grid-cols-4 gap-small max-w-[335px]
           main:max-w-screen-main text-black rounded-xl shadow-panel items-center source-text`,
          className,
          {
            'border border-transparent hover:border-black active:bg-gray': withHover,
            'bg-gray text-text border-none': isDeleted,
            'main:grid-cols-favorite-car': isFavorites,
            'main:grid-cols-order-car': isOrders,
            'main:grid-cols-order-page-car main:!p-5 main:!rounded-large max-w-[1078px]': isOrderPage,
            'main:grid-cols-stoke-car': isStock,
          }
        )}
      >
        <div className='relative border-none shrink-0 !w-[76px] h-[76px] main:!w-16 main:h-16 rounded-xl transition-colors'>
          {loading ? (
            <Skeleton className='!w-[76px] h-[76px] main:!w-16 main:h-16' />
          ) : (
            <NextImage
              src={getCarImage('small', getFirstImage(car?.images))}
              photoPlugCar
              className='absolute rounded-xl '
            />
          )}
        </div>
        <span className='col-span-3 main:col-span-1 max-main:pl-5 max-main:min-h-full flex'>
          <p
            className={cn('text-black font-bold w-[200px] flex items-center main:inline', {
              'text-text': isDeleted,
            })}
          >
            {loading ? <Skeleton className='!w-[200px] h-[76px] main:h-16' /> : car?.name}
          </p>
          {loading && !withoutIndicatorNotChecked && !isOrderPage ? (
            <Skeleton className='!w-3 h-3 main:!hidden' />
          ) : (
            <IndicatorNotChecked className={cn('inline main:hidden', { invisible: withoutIndicatorNotChecked })} />
          )}
        </span>
        <p className='inline whitespace-nowrap source-mobile-title font-normal col-span-2 main:hidden'>
          {loading ? <Skeleton /> : normalizeArrayToSeparatedString(descriptionCar, ' / ')}
        </p>
        {descriptionCar.map((description, index) => (
          <p key={index} className='text-center hidden main:inline'>
            {loading ? <Skeleton /> : description}
          </p>
        ))}
        {children}
      </div>
    </div>
  )
}
