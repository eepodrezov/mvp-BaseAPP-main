import { NextImage } from '@/shared/ui/next-image'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import GeoLocation from '@/shared/assets/icons/common/geo-location.svg'
import { OptionalLinkWrapper, useTranslate } from '@/shared/lib'
import {
  CAR_TYPE_DRIVE_CONSTANTS_KEYS,
  CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS,
  CAR_TYPE_FUEL_CONSTANTS_KEYS,
  CarCollectionItem,
  getCarPriceStr,
} from '../../lib'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { normalizeArrayToSeparatedString, getNumberWithDevider } from '@/shared/helpers'
import { FCWithClassName } from '@/shared/@types'
import { getCarYear, getCarPrice } from '../../lib'
import { useFavoritesRequest } from '../../model'
import { FavoriteButton } from '@/shared/ui'
import { useModalState, useWindowDimensions } from '@/shared/hooks'
import { signInModalAtom } from '@/features'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'

export interface CarCardProps {
  type: 'catalog' | 'page'
  car?: CarCollectionItem
  loading?: boolean
  href?: string
  extraPageContent?: ReactElement
  isBooking?: boolean
}

export const CarCard: FCWithClassName<CarCardProps> = ({
  type,
  car,
  isBooking,
  className,
  loading,
  href,
  extraPageContent,
}) => {
  const { t } = useTranslate(['car', 'common'])
  const viewer = useAtomValue(viewerAtom)
  const { onOpen } = useModalState(signInModalAtom)
  const { mutate: favorite } = useFavoritesRequest(t)
  const { isMobile } = useWindowDimensions()
  const [isFavorite, setIsFavorite] = useState(car?.isFavorite)

  useEffect(() => {
    setIsFavorite(car?.isFavorite)
  }, [car?.isFavorite])

  const { subValue, mainValue } = useMemo(
    () =>
      getCarPriceStr(
        t,
        getCarPrice(car?.price?.rubValue, true),
        getCarPrice(car?.price?.value),
        car?.price?.currency?.name
      ),
    [car?.price.rubValue, car?.price.value]
  )

  if (!car && !loading) return null

  const onFavorite = () => (viewer ? [favorite({ id: car!.id }), setIsFavorite(prev => !prev)] : onOpen())

  return (
    <OptionalLinkWrapper href={href}>
      <div
        data-testid='card-container'
        className={cn(
          `flex flex-col relative text-black group w-full
          desktop:rounded-large bg-white shadow-[0_5px_10px_rgba(0,0,0,0.06)]
          desktop:shadow-[10px_10px_30px_rgba(0,0,0,0.11)] border border-transparent`,
          className,
          {
            'desktop:max-w-[420px]': type === 'catalog',
            'active:bg-gray desktop:hover:border-black': type === 'catalog' && !loading,
            'desktop:flex-row desktop:max-w-full desktop:justify-between': type === 'page',
          }
        )}
      >
        <div
          className={cn('w-full pt-5 pl-5 desktop:hidden transition-colors', {
            'pr-5': !car?.images.length,
          })}
        >
        </div>
        <div
          className={cn(
            'hidden desktop:block relative -top-0.5 -left-0.5 border-none shrink-0 rounded-large overflow-hidden transition-colors',
            {
              'w-[422px] h-[316px]': type === 'catalog',
              'w-[430px] h-[462px]': type === 'page',
            }
          )}
        >
          {loading ? (
            <Skeleton className='h-full' />
          ) : (
            <NextImage
              src={car?.images[0]?.pathS3}
              className={cn('absolute -top-px -left-px', {
                'rounded-b-large': type === 'catalog',
                'rounded-large': type === 'page',
              })}
            />
          )}
        </div>
        <div
          className={cn('flex flex-col h-full text-black w-full transition-colors desktop:rounded-b-large', {
            'justify-between': type === 'catalog',
          })}
        >
          <>
            <div className={cn('flex flex-col px-5 pt-5', { 'gap-small': loading })}>
              {loading ? (
                <Skeleton className='h-full' />
              ) : (
                <div
                  className={cn('flex items-center gap-2 mb-small', {
                    'mb-2.5': type === 'page',
                    'desktop:mb-2': type === 'catalog',
                  })}
                >
                  <GeoLocation className='fill-text' />
                  <span className='text-text source-text max-w-[350px] truncate'>
                    {normalizeArrayToSeparatedString([car?.location?.country?.name, car?.location?.city], ', ')}
                  </span>
                </div>
              )}
              {loading ? (
                <Skeleton className='h-[2.421rem]' />
              ) : (
                <OptionalLinkWrapper href={href}>
                  <p
                    className={cn(
                      'croogla-secondary-text line-clamp-2 !text-black hover:!text-red transition-colors desktop:max-tablet:line-clamp-3 ',
                      {
                        'max-w-[400px] mb-5': type === 'page',
                        'h-[52px] mb-small': type === 'catalog',
                        '!text-black hover:!text-black': isBooking,
                      }
                    )}
                  >
                    {normalizeArrayToSeparatedString([car?.brand.name, car?.model.name], ' ')}
                  </p>
                </OptionalLinkWrapper>
              )}
              {loading ? (
                <>
                  <Skeleton className='h-full' />
                  <Skeleton className='h-full' />
                </>
              ) : (
                <div
                  className={cn('grid grid-cols-2 gap-2.5 desktop:source-text desktop:max-tablet:grid-cols-1', {
                    'source-mobile-text desktop:gap-2': type === 'catalog',
                    'source-text desktop:gap-3': type === 'page',
                  })}
                >
                  <p>
                    {normalizeArrayToSeparatedString(
                      [
                        `${car?.literEngineVolume} ${t('L')}`,
                        `${car?.enginePower} ${t('HP')}`,
                        car && t(CAR_TYPE_FUEL_CONSTANTS_KEYS[car.fuelType]),
                      ],
                      ' / '
                    )}
                  </p>
                  <p
                    className={cn('text-right', {
                      'source-secondary-title desktop:source-text desktop:max-tablet:text-left': type === 'page',
                      'source-mobile-title desktop:source-secondary-title': type === 'catalog',
                    })}
                  >
                    {`${getNumberWithDevider(Number(car?.mileage), ' ')} ${t('km')}`}
                  </p>
                  <p>
                    {normalizeArrayToSeparatedString(
                      [
                        car && t(CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS[car.transmissionType ?? null]),
                        car && t(CAR_TYPE_DRIVE_CONSTANTS_KEYS[car.driveType ?? null]),
                      ],
                      ' / '
                    )}
                  </p>
                  <p
                    className={cn('text-right', {
                      'source-secondary-title desktop:source-text desktop:max-tablet:text-left': type === 'page',
                      'source-mobile-title desktop:source-secondary-title': type === 'catalog',
                    })}
                  >
                    {`${car && getCarYear(car)}`}
                  </p>
                </div>
              )}
            </div>
            {type === 'catalog' && (
              <div className='px-5 pb-5 mt-5 croogla-secondary-title desktop:mt-base'>
                {loading ? (
                  <Skeleton className='h-10' />
                ) : (
                  <div>
                    <p className='source-text text-text'>{subValue}</p>
                    <div className='flex justify-between'>
                      <p>{mainValue}</p>
                      <FavoriteButton
                        isFavorite={isFavorite}
                        onClick={e => [e.preventDefault(), onFavorite()]}
                        isSmallIcon={isMobile}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {type === 'page' && extraPageContent}
          </>
        </div>
      </div>
    </OptionalLinkWrapper>
  )
}
