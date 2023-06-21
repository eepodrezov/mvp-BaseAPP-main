import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select, Tooltip } from '@/shared/ui'
import { useAtom, useAtomValue } from 'jotai'
import { useManufacturerCollection, carCollectionManufacturer, carCollectionManufacturerCountry } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarManufacturerSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const manufacturerCountry = useAtomValue(carCollectionManufacturerCountry)
  const { data, isLoading } = useManufacturerCollection({
    enabled: !!manufacturerCountry,
  })
  const [manufacturer, setManufacturer] = useAtom(carCollectionManufacturer)

  return (
    <Tooltip label={t('Choose a manufacturer country first')} isActive={!manufacturerCountry} placement='bottom'>
      <FiltersApplyButton>
        <Select
          name='car-manufacturer'
          label={t('Car plant')}
          value={manufacturer}
          className={className}
          isLoading={isLoading}
          disabled={!manufacturerCountry}
          options={normalizeSelectOptions(data?.items)}
          onChange={setManufacturer}
        />
      </FiltersApplyButton>
    </Tooltip>
  )
}
