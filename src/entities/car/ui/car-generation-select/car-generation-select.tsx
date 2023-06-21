import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import {
  generationCollectionName,
  useGenerationCollection,
  carCollectionGeneration,
  carCollectionModel,
} from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarGenerationSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const model = useAtomValue(carCollectionModel)
  const { data, isLoading } = useGenerationCollection({
    enabled: !!model,
  })
  const setName = useUpdateAtom(generationCollectionName)
  const [generation, setGeneration] = useAtom(carCollectionGeneration)

  return (
    <FiltersApplyButton>
      <Select
        name='car-generation'
        label={t('Gen')}
        value={generation}
        isLoading={isLoading}
        disabled={!model}
        className={className}
        options={normalizeSelectOptions(data?.items)}
        onChange={setGeneration}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
