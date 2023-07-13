import { useEffect, useMemo } from 'react'
import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch } from '@/shared/ui'
import { useAtom } from 'jotai'
import { productCollectionBrand } from '../../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features/filters/ui/filters-apply-button'
import { mock } from 'mockjs'
import { BRAND_ENTITY_MOCK } from '@/shared/config'



export const ProductBrandSelect: FCWithClassName = ({ className }) => {

  const options = useMemo(() => [
    mock(BRAND_ENTITY_MOCK),
    mock(BRAND_ENTITY_MOCK),
    mock(BRAND_ENTITY_MOCK),
    mock(BRAND_ENTITY_MOCK),
  ],[])
  const { t } = useTranslate(['product'])
  const [brand, setBrand] = useAtom(productCollectionBrand)

  useEffect(() => {
    //todo reset model chang
  }, [brand])

  return (
    <FiltersApplyButton>
      <SelectSearch
        showSearch
        name='product-brand'
        label={t('brand')}
        value={brand}
        className={className}
        options={normalizeSelectOptions(options)}
        onChange={setBrand}
      />
    </FiltersApplyButton>
  )
}
