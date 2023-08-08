import { NextImage } from '@/shared/ui/next-image'
import { ReactElement, useEffect, useState } from 'react'
import GeoLocation from '@/shared/assets/icons/common/geo-location.svg'
import { Carousel } from '@/shared/ui/carousel'
import { OptionalLinkWrapper, useTranslate } from '@/shared/lib'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { normalizeArrayToSeparatedString, getNumberWithDevider } from '@/shared/helpers'
import { FCWithClassName } from '@/shared/@types'
import { CarCollectionItem, useFavoritesRequest } from '@/entities/car'
import { FavoriteButton } from '@/shared/ui'
import { useModalState, useWindowDimensions } from '@/shared/hooks'
import { signInModalAtom } from '@/features'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'
import { getSortingImages } from '@/entities/car'
import { getCarImage } from '@/entities/car'

type CardType = 'catalog' | 'page'

export interface ProductCardProps {
  type: CardType
  car?: CarCollectionItem
  loading?: boolean
  href?: string
  extraPageContent?: ReactElement
  isBooking?: boolean
}

export const ProductCard: FCWithClassName<ProductCardProps> = ({
  type = 'catalog',
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

  if (!car && !loading) return null

  const onFavorite = () => (viewer ? [favorite({ id: car!.id }), setIsFavorite(prev => !prev)] : onOpen())

  const sortingImages = getSortingImages(car?.images)

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
            'active:bg-gray desktop:hover:shadow-[10px_10px_30px_rgba(0,0,0,0.2)]': type === 'catalog' && !loading,
            'desktop:flex-row desktop:max-w-full desktop:justify-between': type === 'page',
          }
        )}
      >
        <div
          className={cn('w-full pt-5 pl-5 desktop:hidden transition-colors', {
            'pr-5': !sortingImages?.length,
          })}
        >
          {loading ? (
            <Skeleton className='!w-[calc(100vw-25px)] h-[200px]' />
          ) : (
            <Carousel
              className={cn({
                '!w-[calc(100vw-25px)]': sortingImages?.length,
                '!w-[calc(100vw-45px)]': !sortingImages?.length,
              })}
              images={sortingImages}
              slideWidth={266}
              slideHeight={200}
              slideBorderRadius={16}
              spaceBetween={20}
            />
          )}
        </div>
        <div
          className={cn(
            'hidden desktop:block relative border-none shrink-0 rounded-large overflow-hidden transition-colors',
            {
              'w-[420px] h-[316px]': type === 'catalog',
              'w-[430px] h-[462px]': type === 'page',
            }
          )}
        >
          {loading ? (
            <Skeleton className='h-full' />
          ) : (
            <NextImage
              src={getCarImage('big', sortingImages?.[0])}
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
                  {car?.name}
                </p>
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
                  <p
                    className={cn('text-right', {
                      'source-secondary-title desktop:source-text desktop:max-tablet:text-left': type === 'page',
                      'source-mobile-title desktop:source-secondary-title': type === 'catalog',
                    })}
                  >
                    {`${2019}`}
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
                    <div className='flex justify-between'>
                      <p>{999999}</p>
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
