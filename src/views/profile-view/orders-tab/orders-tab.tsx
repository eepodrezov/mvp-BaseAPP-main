import dynamic, { LoaderComponent } from 'next/dynamic'
import { CarCatalogPlug } from '@/entities/car'
import { useMemo } from 'react'
import { OrderCar, OrderCarCard, ORDER_STATUS_WITH_BOOKING_LINK, useOrdersCollection } from '@/entities/order'
import { ProfileCarHeaderProps } from '@/widgets/profile-car-header'
import { Button } from '@/shared/ui'
import UploadIcon from '@/shared/assets/icons/common/upload.svg'
import cn from 'classnames'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'
import { useTranslate } from '@/shared/lib'
import { useRestoreScroll } from '@/shared/hooks'

const ProfileCarHeader = dynamic(
  () =>
    import('@/widgets/profile-car-header').then(mod => mod.ProfileCarHeader) as LoaderComponent<ProfileCarHeaderProps>,
  { ssr: false }
)

export const OrdersTab = () => {
  const viewer = useAtomValue(viewerAtom)

  useRestoreScroll()

  const { t } = useTranslate(['car'])
  const { data, isError, isRefetching, isFetched, isLoading, status, fetchNextPage, hasNextPage } = useOrdersCollection(
    {
      enabled: !!viewer,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
  const isDataEmpty = (isFetched || isError) && !data?.pages[0].totalItems

  const getOnClickLink = (order: OrderCar) => {
    const orderStatus = order.currentStep.currentStatus.status
    if (ORDER_STATUS_WITH_BOOKING_LINK.includes(orderStatus)) return `/booking/${order.id}`
    else return `/profile/orders/${order.id}`
  }

  const OrdersContent = useMemo(() => {
    if (isDataEmpty) return <CarCatalogPlug notFoundText={t('You_have_not_received_any_orders_yet')} />
    if (!data?.pages[0].totalItems) return Array.from({ length: 10 }).map((_, i) => <OrderCarCard loading key={i} />)
    return data?.pages.map(({ items }) =>
      items.map((order: OrderCar) => <OrderCarCard href={getOnClickLink(order)} key={order.id} order={order} />)
    )
  }, [isRefetching, isDataEmpty, status])

  return (
    <div className={cn({ 'desktop:p-10 pt-large pl-5': !isDataEmpty })}>
      <div className='flex flex-col gap-medium w-full'>
        {isDataEmpty || <ProfileCarHeader nameHeader={t('profile:MyOrders')} />}
        <div className='flex flex-col desktop:flex-row gap-large'>
          <div
            className={cn('gap-base main:gap-5 w-full h-fit', {
              'grid grid-cols-[repeat(auto-fit,335px)] main:grid-cols-1': !isDataEmpty,
              'mb-large': !hasNextPage,
            })}
          >
            {OrdersContent}
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
