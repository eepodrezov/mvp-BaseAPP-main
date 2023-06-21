import { useEffect } from 'react'
import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { SelectSearch, Tooltip } from '@/shared/ui'
import { useAtom, useAtomValue } from 'jotai'
import { useResetAtom, useUpdateAtom } from 'jotai/utils'
import {
  modelCollectionName,
  carCollectionModel,
  useModelCollection,
  carCollectionBrand,
  carCollectionConfiguration,
  carCollectionGeneration,
} from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarModelSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const brand = useAtomValue(carCollectionBrand)
  const { data, isLoading } = useModelCollection({
    enabled: !!brand,
  })
  const setName = useUpdateAtom(modelCollectionName)
  const [model, setModel] = useAtom(carCollectionModel)
  const resetGeneration = useResetAtom(carCollectionGeneration)
  const resetConfiguration = useResetAtom(carCollectionConfiguration)

  useEffect(() => {
    if (!model) {
      resetGeneration()
      resetConfiguration()
    }
  }, [model])

  return (
    <Tooltip label={t('Choose a brand first')} isActive={!brand} placement='bottom'>
      <FiltersApplyButton>
        <SelectSearch
          showSearch
          name='car-model'
          label={t('Model')}
          value={model}
          isLoading={isLoading}
          disabled={!brand}
          className={className}
          options={normalizeSelectOptions(data?.items)}
          onChange={setModel}
          onSearch={setName}
        />
      </FiltersApplyButton>
    </Tooltip>
  )
}
