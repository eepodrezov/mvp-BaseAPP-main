import { normalizeSelectOptionsFromConstantsKeysArray } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionEcoType } from '../../model'
import { CAR_TYPE_ECO_CONSTANTS_KEYS } from '../../lib'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarEcoTypeSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const [ecoType, setEcoType] = useAtom(carCollectionEcoType)

  return (
    <FiltersApplyButton>
      <Select
        name='car-ecoType'
        label={t('Emission Class')}
        value={ecoType}
        className={className}
        options={normalizeSelectOptionsFromConstantsKeysArray(CAR_TYPE_ECO_CONSTANTS_KEYS, t)}
        onChange={setEcoType}
      />
    </FiltersApplyButton>
  )
}
