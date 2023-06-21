import { useEffect } from 'react'
import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useResetAtom, useUpdateAtom } from 'jotai/utils'
import { brandCollectionName, carCollectionBrand, carCollectionModel, useBrandCollection } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features/filters/ui/filters-apply-button'

export const CarBrandSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const { data, isLoading } = useBrandCollection()
  const setName = useUpdateAtom(brandCollectionName)
  const [brand, setBrand] = useAtom(carCollectionBrand)
  const resetModel = useResetAtom(carCollectionModel)

  useEffect(() => {
    if (!brand) {
      resetModel()
    }
  }, [brand])

  return (
    <FiltersApplyButton>
      <SelectSearch
        showSearch
        name='car-brand'
        label={t('brand')}
        value={brand}
        className={className}
        isLoading={isLoading}
        options={normalizeSelectOptions(data?.items)}
        onChange={setBrand}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
