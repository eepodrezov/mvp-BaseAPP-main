import { OptionalLinkWrapper, useTranslate } from '@/shared/lib'
import { FavoriteButton } from '@/shared/ui'
import { FC, useMemo, useState } from 'react'
import { FavoriteCar, getCarPrice, getCarPriceStr } from '../../lib'
import { useFavoritesRequest } from '../../model'
import { ProfileCarCard } from '../profile-car-card'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'

export interface FavoriteCarCardProps {
  favoriteCar?: FavoriteCar
  loading?: boolean
  href?: string
}

export const FavoriteCarCard: FC<FavoriteCarCardProps> = ({ loading, href, favoriteCar }) => {
  const { t } = useTranslate(['car', 'common'])
  const [isFavorite, setIsFavorite] = useState(true)
  const { mutate: favorite } = useFavoritesRequest(t)

  const carPrice = favoriteCar?.car.price

  const { mainValue } = useMemo(
    () =>
      getCarPriceStr(
        t,
        getCarPrice(carPrice?.rubValue, true),
        getCarPrice(carPrice?.value, true),
        carPrice?.currency?.name
      ),
    [carPrice?.rubValue, carPrice?.value]
  )

  if (!favoriteCar?.car && !loading) return null
  const isDeleted = favoriteCar?.car.blocked || !favoriteCar?.car.visible
  // TODO:Изменить как будет ясно что нужно сюда
  const fromDays = 100

  return (
    <OptionalLinkWrapper {...(!isDeleted && { href })}>
      <ProfileCarCard
        car={favoriteCar?.car}
        isDeleted={isDeleted}
        isFavorites
        loading={loading}
        withoutIndicatorNotChecked
      >
        <p
          className={cn(
            'max-main:col-span-2 max-main:text-right text-black source-mobile-sub-text main:source-text !font-bold',
            {
              'text-text': isDeleted,
              'text-black': !isDeleted,
            }
          )}
        >
          {loading ? <Skeleton /> : `${t('from')} ${fromDays} ${t('days')}`}
        </p>
        <p
          className={cn('max-main:text-left max-main:col-span-3 text-right', {
            'text-text source-mobile-text main:source-text max-main:h-[35px] max-main:flex max-main:items-center':
              isDeleted,
            'text-black source-title': !isDeleted,
          })}
        >
          {loading ? <Skeleton /> : isDeleted ? t('out_of_stock') : mainValue}
        </p>
        {loading ? (
          <Skeleton />
        ) : (
          <FavoriteButton
            className='h-full !justify-end main:mr-[14px]'
            iconClassName='max-main:w-6'
            isFavorite={isFavorite}
            onClick={e => [
              e.preventDefault(),
              favoriteCar?.car?.id && favorite({ id: favoriteCar.car.id }),
              setIsFavorite(prev => !prev),
            ]}
          />
        )}
      </ProfileCarCard>
    </OptionalLinkWrapper>
  )
}
