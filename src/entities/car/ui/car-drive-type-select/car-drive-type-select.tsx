import { normalizeSelectOptionsFromConstantsKeysArray } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionDriveType } from '../../model'
import { CAR_TYPE_DRIVE_CONSTANTS_KEYS } from '../../lib'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarDriveTypeSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const [driveType, setDriveType] = useAtom(carCollectionDriveType)

  return (
    <FiltersApplyButton>
      <Select
        name='car-driveType'
        label={t('Drive')}
        value={driveType}
        className={className}
        options={normalizeSelectOptionsFromConstantsKeysArray(CAR_TYPE_DRIVE_CONSTANTS_KEYS, t)}
        onChange={setDriveType}
      />
    </FiltersApplyButton>
  )
}
