import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionAge, useRangesCollection } from '../../model'

export const CarAgeRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [age, setAge] = useAtom(carCollectionAge)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={age}
        name='car-years'
        onChange={setAge}
        className={className}
        min={data?.years_min}
        max={data?.years_max}
      />
    </FiltersApplyButton>
  )
}
