import { FiltersApplyButton } from '@/features'
import { FCWithClassName } from '@/shared/@types'
import { RangeInput } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionEngineVolume, useRangesCollection } from '../../model'

export const CarEngineVolumeRange: FCWithClassName = ({ className }) => {
  const { data } = useRangesCollection({ keepPreviousData: true })
  const [engineVolume, setEngineVolume] = useAtom(carCollectionEngineVolume)

  return (
    <FiltersApplyButton>
      <RangeInput
        value={engineVolume}
        className={className}
        name='car-engineVolume'
        onChange={setEngineVolume}
        step={0.1}
        min={data?.engineVolume_min}
        max={data?.engineVolume_max}
      />
    </FiltersApplyButton>
  )
}
