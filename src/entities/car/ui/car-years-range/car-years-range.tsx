import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionYears, useRangesCollection } from '../../model'

export const CarYearsRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [years, setYears] = useAtom(carCollectionYears)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={years}
        name='car-years'
        onChange={setYears}
        className={className}
        min={data?.years_min}
        max={data?.years_max}
      />
    </FiltersApplyButton>
  )
}
