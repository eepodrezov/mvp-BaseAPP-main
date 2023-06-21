import { normalizeSelectOptionsFromConstantsKeysArray } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionTransmissionType } from '../../model'
import { CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS } from '../../lib'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarTransmissionTypeSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const [transmissionType, setTransmissionType] = useAtom(carCollectionTransmissionType)

  return (
    <FiltersApplyButton>
      <Select
        name='car-transmissionType'
        label={t('Transmission')}
        value={transmissionType}
        className={className}
        options={normalizeSelectOptionsFromConstantsKeysArray(CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS, t)}
        onChange={setTransmissionType}
      />
    </FiltersApplyButton>
  )
}
