import { CarStockItem, CarCatalogPlug, useStockCollection, StockCarCard } from '@/entities/car'
import { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { ROLE_DEALER, viewerAtom } from '@/entities/viewer'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { ProfileCarHeaderProps } from '@/widgets/profile-car-header'
import dynamic, { LoaderComponent } from 'next/dynamic'
import UploadIcon from '@/shared/assets/icons/common/upload.svg'
import cn from 'classnames'
import { useRestoreScroll } from '@/shared/hooks'

const ProfileCarHeader = dynamic(
  () =>
    import('@/widgets/profile-car-header').then(mod => mod.ProfileCarHeader) as LoaderComponent<ProfileCarHeaderProps>,
  { ssr: false }
)

export const StockTab = () => {
  const viewer = useAtomValue(viewerAtom)

  useRestoreScroll()

  const { t } = useTranslate(['car'])
  const { data, isError, isRefetching, isFetched, status, isLoading, hasNextPage, fetchNextPage } = useStockCollection({
    enabled: !!(viewer && viewer.roles.includes(ROLE_DEALER)),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const isDataEmpty = (isFetched || isError) && !data?.pages[0].totalItems

  const StockContent = useMemo(() => {
    if (isDataEmpty) return <CarCatalogPlug notFoundText={t('You_dont_have_cars_for_sale_yet')} />
    if (!data?.pages[0].totalItems) return Array.from({ length: 10 }).map((_, i) => <StockCarCard loading key={i} />)
    return data?.pages.map(({ items }) =>
      items.map((car: CarStockItem) => <StockCarCard href={`/autos/${car.id}`} key={car.id} car={car} />)
    )
  }, [isRefetching, isDataEmpty, status])

  return (
    <div className={cn({ 'desktop:p-10 pt-large pl-5': !isDataEmpty })}>
      <div className='flex flex-col gap-medium w-full'>
        {isDataEmpty || <ProfileCarHeader nameHeader={t('profile:Stock')} withColumns={false} />}
        <div className='flex flex-col desktop:flex-row gap-large'>
          <div
            className={cn('gap-base main:gap-5 w-full h-fit', {
              'grid grid-cols-[repeat(auto-fit,335px)] main:grid-cols-1': !isDataEmpty,
              'mb-large': !hasNextPage,
            })}
          >
            {StockContent}
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
