import { useEffect } from 'react'
import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useResetAtom, useUpdateAtom } from 'jotai/utils'
import {
  manufacturerCountryCollectionName,
  useManufacturerCountryCollection,
  carCollectionManufacturerCountry,
  carCollectionManufacturer,
} from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarManufacturerCountrySelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const { data, isLoading } = useManufacturerCountryCollection()
  const setName = useUpdateAtom(manufacturerCountryCollectionName)
  const [manufacturerCountry, setManufacturerCountry] = useAtom(carCollectionManufacturerCountry)
  const resetManufacturer = useResetAtom(carCollectionManufacturer)

  useEffect(() => {
    if (!manufacturerCountry) {
      resetManufacturer()
    }
  }, [manufacturerCountry])

  return (
    <FiltersApplyButton>
      <Select
        name='car-manufacturerCountry'
        label={t('Production country')}
        value={manufacturerCountry}
        className={className}
        isLoading={isLoading}
        options={normalizeSelectOptions(data?.items, { labelKey: 'name' }, true)}
        onChange={setManufacturerCountry}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
