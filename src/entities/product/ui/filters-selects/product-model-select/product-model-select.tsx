import { useEffect, useMemo } from 'react'
import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch } from '@/shared/ui'
import { useAtom } from 'jotai'
import { productCollectionModel } from '../../../model'
import { FC } from '@/shared/@types'
import { FiltersApplyButton } from '@/features/filters/ui/filters-apply-button'
import { mock } from 'mockjs'
import { MODEL_ENTITY_MOCK } from '@/shared/config'



export const ProductModelSelect: FC = ({ className }) => {

  const options = useMemo(() => [
    mock(MODEL_ENTITY_MOCK),
    mock(MODEL_ENTITY_MOCK),
    mock(MODEL_ENTITY_MOCK),
    mock(MODEL_ENTITY_MOCK),
  ],[])
  const { t } = useTranslate(['product'])
  const [model, setModel] = useAtom(productCollectionModel)

  useEffect(() => {
    //todo reset model chang
  }, [model])

  return (
    <FiltersApplyButton>
      <SelectSearch
        showSearch
        name='product-model'
        label={t('model')}
        value={model}
        className={className}
        options={normalizeSelectOptions(options)}
        onChange={setModel}
      />
    </FiltersApplyButton>
  )
}
