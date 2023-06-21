import { NextImage } from '@/shared/ui/next-image'
import GeoLocation from '@/shared/assets/icons/common/geo-location.svg'
import { Carousel } from '@/shared/ui/carousel'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { normalizeArrayToSeparatedString } from '@/shared/helpers'
import { FCWithClassName } from '@/shared/@types'
import { FavoriteButton } from '@/shared/ui'
import { useWindowDimensions } from '@/shared/hooks'
import { Product } from '@/entities/product'

export interface CardProps {
  product?: Product
}

const loading = false
export const Card: FCWithClassName<CardProps> = ({
  product,
  className,
}) => {
  const { isMobile } = useWindowDimensions()

  const  content = {...product}

  if (!content) return null

  return (
      <div
        data-testid='card-container'
        className={cn(
          `flex flex-col relative text-black group w-full
          desktop:rounded-large bg-white shadow-[0_5px_10px_rgba(0,0,0,0.06)]
          desktop:shadow-[10px_10px_30px_rgba(0,0,0,0.11)] border border-transparent
          desktop:max-w-[420px] active:bg-gray desktop:hover:border-black
          `,
          className,
        )}
      >
        <div
          className={cn('w-full pt-5 pl-5 desktop:hidden transition-colors', {
            'pr-5': !content?.images?.length,
          })}
        >
          {loading ? (
            <Skeleton className='!w-[calc(100vw-25px)] h-[200px]' />
          ) : (
            <Carousel
              className={cn({
                '!w-[calc(100vw-25px)]': content?.images?.length,
                '!w-[calc(100vw-45px)]': !content?.images?.length,
              })}
              images={content?.images}
              slideWidth={266}
              slideHeight={200}
              slideBorderRadius={16}
              spaceBetween={20}
            />
          )}
        </div>
        <div
          className={cn(
            'w-[422px] h-[316px] hidden desktop:block relative -top-0.5 -left-0.5 border-none shrink-0 rounded-large overflow-hidden transition-colors',
          )}
        >
          {loading ? (
            <Skeleton className='h-full' />
          ) : (
            <NextImage
              src={content?.images?.[0]}
              className={cn('absolute -top-px -left-px rounded-b-large')}
            />
          )}
        </div>
        <div
          className={cn('flex flex-col h-full text-black w-full transition-colors desktop:rounded-b-large justify-between')}
        >
          <>
            <div className={cn('flex flex-col px-5 pt-5', { 'gap-small': loading })}>
              {loading ? (
                <Skeleton className='h-full' />
              ) : (
                <div
                  className={cn('flex items-center gap-2 mb-small desktop:mb-2')}
                >
                  <GeoLocation className='fill-text' />
                  <span className='text-text source-text max-w-[350px] truncate'>
                    {normalizeArrayToSeparatedString([content?.country], ', ')}
                  </span>
                </div>
              )}
              {loading ? (
                <Skeleton className='h-[2.421rem]' />
              ) : (
                <p
                  className={cn(
                    'croogla-secondary-text line-clamp-2 !text-black hover:!text-red transition-colors desktop:max-tablet:line-clamp-3 h-[52px] mb-small')}
                >
                  {normalizeArrayToSeparatedString([content?.brand], ' ')}
                </p>
              )}
              {loading ? (
                <>
                  <Skeleton className='h-full' />
                  <Skeleton className='h-full' />
                </>
              ) : (
                <div
                  className={cn('grid grid-cols-2 gap-2.5 desktop:source-text desktop:max-tablet:grid-cols-1 source-mobile-text desktop:gap-2', {
                  })}
                >
                  <p>
                    {content?.description}
                  </p>
                  <p
                    className={cn('text-right source-mobile-title desktop:source-secondary-title', {
                    })}
                  >
                    {'Инфо'}
                  </p>
                  <p>
                    {normalizeArrayToSeparatedString(
                      [
                        'Еще инфа',
                        'и еще инфа',
                      ],
                      ' / '
                    )}
                  </p>
                  <p
                    className={cn('text-right source-mobile-title desktop:source-secondary-title', {
                    })}
                  >
                    {'и еще чуть-чуть'}
                  </p>
                </div>
              )}
            </div>
            <div className='px-5 pb-5 mt-5 croogla-secondary-title desktop:mt-base'>
              {loading ? (
                <Skeleton className='h-10' />
              ) : (
                <div>
                  <div className='flex justify-between'>
                    <p>{`${content.price?.value} ${content.price?.currency}`}</p>
                    <FavoriteButton
                      isSmallIcon={isMobile}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
  )
}
