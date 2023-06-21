import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionOwners, useRangesCollection } from '../../model'

export const CarOwnersRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [owners, setOwners] = useAtom(carCollectionOwners)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={owners}
        name='car-owners'
        onChange={setOwners}
        className={className}
        min={data?.owners_min}
        max={data?.owners_max}
      />
    </FiltersApplyButton>
  )
}
