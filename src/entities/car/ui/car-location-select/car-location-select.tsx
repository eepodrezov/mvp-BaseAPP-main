import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import {
  locationCollectionName,
  useLocationCollection,
  carCollectionLocation,
  carCollectionIsCustomUnion,
} from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarLocationSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car', 'common'])
  const { data, isLoading } = useLocationCollection()
  const setName = useUpdateAtom(locationCollectionName)
  const [location, setLocation] = useAtom(carCollectionLocation)
  const [isCustomUnion, setCustomUnion] = useAtom(carCollectionIsCustomUnion)
  const customUnionOption = { label: t('common:Custom_union'), id: 'customUnion' }

  function handleChange(option: number | string | null): void {
    if (option) {
      if ((option as string) === 'customUnion') {
        setLocation(null)
        setCustomUnion(true)
      } else {
        setCustomUnion(null)
        setLocation(option as number)
      }
    }
  }

  return (
    <FiltersApplyButton>
      <SelectSearch
        showSearch
        name='car-location'
        label={t('Location country')}
        value={isCustomUnion ? customUnionOption.id : location}
        className={className}
        isLoading={isLoading}
        options={[customUnionOption, ...normalizeSelectOptions(data?.items, { labelKey: 'name' }, false)]}
        onChange={handleChange}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
