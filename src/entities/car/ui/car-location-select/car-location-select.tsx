import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { locationCollectionName, useLocationCollection, carCollectionLocation } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarLocationSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const { data, isLoading } = useLocationCollection()
  const setName = useUpdateAtom(locationCollectionName)
  const [location, setLocation] = useAtom(carCollectionLocation)

  return (
    <FiltersApplyButton>
      <SelectSearch
        showSearch
        name='car-location'
        label={t('Location country')}
        value={location}
        className={className}
        isLoading={isLoading}
        options={normalizeSelectOptions(data?.items, { labelKey: 'name' }, true)}
        onChange={setLocation}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
