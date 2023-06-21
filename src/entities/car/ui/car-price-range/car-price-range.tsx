import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeSelect } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionPrice, useRangesCollection } from '../../model'

export const CarPriceRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [price, setPrice] = useAtom(carCollectionPrice)
  return (
    <FiltersApplyButton>
      <RangeSelect
        value={price}
        name='car-price'
        onChange={setPrice}
        className={className}
        min={data?.price_min}
        max={data?.price_max}
      />
    </FiltersApplyButton>
  )
}
