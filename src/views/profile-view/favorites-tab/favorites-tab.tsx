import { CarCatalogPlug, FavoriteCar, useFavoritesCollection, FavoriteCarCard } from '@/entities/car'
import { viewerAtom } from '@/entities/viewer'
import { ProfileCarHeaderProps } from '@/widgets/profile-car-header'
import { useAtomValue } from 'jotai'
import dynamic, { LoaderComponent } from 'next/dynamic'
import { FC, useMemo } from 'react'
import cn from 'classnames'
import UploadIcon from '@/shared/assets/icons/common/upload.svg'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { PropsWithClassName } from '@/shared/@types'
import { useRestoreScroll } from '@/shared/hooks'

const ProfileCarHeader = dynamic(
  () =>
    import('@/widgets/profile-car-header').then(mod => mod.ProfileCarHeader) as LoaderComponent<
      PropsWithClassName<ProfileCarHeaderProps>
    >,
  { ssr: false }
)

export const FavoritesTab: FC = () => {
  const viewer = useAtomValue(viewerAtom)

  useRestoreScroll()

  const { t } = useTranslate(['car'])
  const { data, isError, isRefetching, isFetched, isLoading, status, fetchNextPage, hasNextPage } =
    useFavoritesCollection({
      enabled: !!viewer,
      refetchOnWindowFocus: false,
      retry: false,
    })
  const isDataEmpty = (isFetched || isError) && !data?.pages[0].totalItems

  const favoriteHeaderColumns = ['RegistrationDate', 'enginePower', 'engineVolume', 'deliveryTime', 'Price']

  const FavoritesContent = useMemo(() => {
    if (isDataEmpty) return <CarCatalogPlug />
    if (!data?.pages[0].totalItems) return Array.from({ length: 10 }).map((_, i) => <FavoriteCarCard loading key={i} />)
    return data?.pages.map(({ items }) =>
      items.map((favoriteCar: FavoriteCar) => (
        <FavoriteCarCard href={`/autos/${favoriteCar.car.id}`} key={favoriteCar.id} favoriteCar={favoriteCar} />
      ))
    )
  }, [isRefetching, isDataEmpty, status])
  return (
    <div className={cn({ 'desktop:p-10 pt-large pl-5': !isDataEmpty })}>
      <div className='flex flex-col gap-medium w-full'>
        {isDataEmpty || (
          <ProfileCarHeader
            className='last:col-start-6'
            headerColumns={favoriteHeaderColumns}
            nameHeader={t('favorites')}
          />
        )}
        <div className='flex flex-col desktop:flex-row gap-large'>
          <div
            className={cn('gap-base main:gap-5 w-full h-fit', {
              'grid grid-cols-[repeat(auto-fit,335px)] main:grid-cols-1': !isDataEmpty,
            })}
          >
            {FavoritesContent}
          </div>
        </div>
        {isLoading ||
          (hasNextPage && (
            <div className='flex max-w-[1078px] justify-center w-full mt-medium'>
              <Button
                variant='text'
                onClick={() => fetchNextPage()}
                disabled={isRefetching}
                childrenClassName='source-text font-bold flex items-center gap-small'
              >
                <button className='flex rounded-full items-center justify-center w-[22px] h-[22px] border-[1.5px] border-currentColor'>
                  <UploadIcon className='stroke-currentColor' />
                </button>
                {t('Load more')}
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}
