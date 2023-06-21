import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionEnginePower, useRangesCollection } from '../../model'

export const CarEnginePowerRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [enginePower, setEnginePower] = useAtom(carCollectionEnginePower)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={enginePower}
        step={10}
        className={className}
        name='car-enginePower'
        onChange={setEnginePower}
        min={data?.enginePower_min}
        max={data?.enginePower_max}
      />
    </FiltersApplyButton>
  )
}
