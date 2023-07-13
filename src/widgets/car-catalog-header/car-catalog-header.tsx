import { useTranslate } from '@/shared/lib'
import { getNumberWithDevider } from '@/shared/helpers'
import { useAtom, useAtomValue } from 'jotai'
import {
  carCollectionOrder,
  carCollectionPage,
  carCollectionPageSize,
  CAR_ORDER_BY_MILEAGE,
  CAR_ORDER_BY_PRICE,
  CAR_ORDER_BY_YEAR,
  useCarCollection,
} from '@/entities/car'
import { Sorting, OrderValue } from '@/shared/ui'
import { FiltersMenuMobile } from '@/widgets/filters-menu-mobile'

export const CarCatalogHeader = () => {
  const { t } = useTranslate(['common','car'])
  const { data, isFetched } = useCarCollection({
    keepPreviousData: true,
    refetchOnMount: false,
  })
  const [page, setPage] = useAtom(carCollectionPage)
  const pageSize = useAtomValue(carCollectionPageSize)
  const [order, setOrder] = useAtom(carCollectionOrder)

  // TODO вынести
  const getPaginationShowingElementText = () => {
    if (isFetched && !data?.items.length) return t('No results')
    const startValue = (page - 1) * pageSize + 1
    const endValue = startValue + pageSize - 1
    return `${t('car:Showing')} ${startValue}-${endValue} ${t('car:of')} ${getNumberWithDevider(data?.totalItems || 0)} ${t(
      'car:Listings'
    )}`
  }

  const handleSort = (value: OrderValue) => {
    setOrder(value)
    setPage(1)
  }

  return (
    <>
      <div className='flex justify-between p-5 desktop:mb-5 desktop:items-center'>
        <div className='desktop:flex desktop:gap-large desktop:items-baseline'>
          <div className='croogla-text desktop:w-[420px] desktop:croogla-title'>
            {t('Header')}
          </div>
          <p className='text-text source-text'>{getPaginationShowingElementText()}</p>
        </div>
        <Sorting
          value={order}
          options={[
            { label: 'year', id: CAR_ORDER_BY_YEAR },
            { label: 'mileage', id: CAR_ORDER_BY_MILEAGE },
            { label: 'Price', id: CAR_ORDER_BY_PRICE },
          ]}
          onChange={handleSort}
        />
      </div>
      <FiltersMenuMobile />
    </>
  )
}
