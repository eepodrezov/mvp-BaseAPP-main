import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useBodyTypeCollection, carCollectionBodyType } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarBodyTypeSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const { data, isLoading } = useBodyTypeCollection()

  const [bodyType, setBodyType] = useAtom(carCollectionBodyType)

  return (
    <FiltersApplyButton>
      <Select
        name='car-bodyType'
        label={t('Body type')}
        value={bodyType}
        className={className}
        isLoading={isLoading}
        options={normalizeSelectOptions(data?.items)}
        onChange={setBodyType}
      />
    </FiltersApplyButton>
  )
}
