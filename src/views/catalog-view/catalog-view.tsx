import dynamic, { LoaderComponent } from 'next/dynamic'
import { CarCollectionItem } from '@/entities/car/lib'
import { CarCatalogPlug, carCollectionPage, useCarCollection } from '@/entities/car'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import cn from 'classnames'
import { PaginationProps } from '@/shared/ui'
import { useRestoreScroll } from '@/shared/hooks'
import { CarCard } from '@/entities/car/ui/car-card'

const CarCatalogHeader = dynamic(() => import('@/widgets/car-catalog-header'), { ssr: false })
const FiltersContent = dynamic(() => import('@/features/filters'), { ssr: false })
const Pagination = dynamic(
  () => import('@/shared/ui').then(mod => mod.Pagination) as LoaderComponent<PaginationProps>,
  { ssr: false }
)

export const CatalogView = () => {
  const { data, isRefetching, isSuccess, isFetching, isFetched } = useCarCollection({
    keepPreviousData: true,
  })

  useRestoreScroll()

  const [page, setPage] = useAtom(carCollectionPage)

  const isDataEmpty = isFetched && !data?.totalItems

  const CarsContent = useMemo(() => {
    if (isDataEmpty) {
      return <CarCatalogPlug />
    }

    if ((isRefetching || isFetching) && !isSuccess) {
      return Array.from({ length: data?.items.length || 10 }).map((_, i) => <CarCard type='catalog' loading key={i} />)
    }

    return data?.items?.map((car: CarCollectionItem) => (
      <CarCard href={`/autos/${car.id}`} key={car.id} type='catalog' car={car} />
    ))
  }, [isRefetching, isFetching, isDataEmpty, isFetched, isSuccess])

  return (
    <div className='mb-large desktop:mb-[60px] desktop:mt-10'>
      <CarCatalogHeader />
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col desktop:flex-row gap-large'>
          <div className='max-w-[420px] min-h-[1000px] w-full overflow-hidden h-fit rounded-large hidden desktop:flex shadow-[10px_10px_30px_rgba(0,0,0,0.11)]'>
            <FiltersContent />
          </div>
          <div
            className={cn('grid gap-small main:grid-cols-2 main:gap-large w-full h-fit', {
              'main:grid-cols-1': isDataEmpty,
            })}
          >
            {CarsContent}
          </div>
        </div>
        <div className='flex justify-center w-full main:justify-end'>
          {!isDataEmpty && (
            <Pagination currentPage={page} onChange={setPage} totalPageCount={data?.countOfPages || 0} />
          )}
        </div>
      </div>
    </div>
  )
}
