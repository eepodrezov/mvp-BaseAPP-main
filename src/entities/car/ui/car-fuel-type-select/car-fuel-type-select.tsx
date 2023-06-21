import { normalizeSelectOptionsFromConstantsKeysArray } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionFuelType } from '../../model'
import { CAR_TYPE_FUEL_CONSTANTS_KEYS } from '../../lib'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarFuelTypeSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const [fuelType, setFuelType] = useAtom(carCollectionFuelType)

  return (
    <FiltersApplyButton>
      <Select
        name='car-fuelType'
        label={t('Fuel type')}
        value={fuelType}
        className={className}
        options={normalizeSelectOptionsFromConstantsKeysArray(CAR_TYPE_FUEL_CONSTANTS_KEYS, t)}
        onChange={setFuelType}
      />
    </FiltersApplyButton>
  )
}
