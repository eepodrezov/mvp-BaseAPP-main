import { FiltersApplyButton } from '@/features/filters/ui/filters-apply-button'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionMileage, useRangesCollection } from '../../model'

export const CarMileageRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [mileage, setMileage] = useAtom(carCollectionMileage)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={mileage}
        step={1000}
        name='car-mileage'
        onChange={setMileage}
        className={className}
        min={data?.mileage_min}
        max={data?.mileage_max}
      />
    </FiltersApplyButton>
  )
}
