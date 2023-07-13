import {
  CarBrandSelect,
  carCollectionType,
  CarModelSelect,
  CarOwnersRange,
  CarPriceRange,
  CarTypeTabs,
  CarAgeRange,
  CAR_TYPE_NEW,
  CarEnginePowerRange,
  CarEngineVolumeRange,
  CarFuelTypeSelect,
  CarManufacturerCountrySelect,
  CarManufacturerSelect,
  CarLocationSelect,
  CarMileageRange,
  CarTransmissionTypeSelect,
  CarDriveTypeSelect,
  CarEcoTypeSelect,
  CarExteriorColorPalette,
  CarInteriorColorPalette,
  hasFiltersChangedAtom,
  isFiltersApplyAtom,
  CarMaterialPalette,
} from '@/entities/car'
import { Button, FilterDisclosure } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import cn from 'classnames'
import { FiltersResetButton } from '../filters-reset-button'
import { useTranslate } from '@/shared/lib'
import { useUpdateAtom } from 'jotai/utils'
import { FCWithClassName } from '@/shared/@types'
import { ProductTypeTabs,
     ProductBrandSelect,
     ProductModelSelect
} from '@/entities/product/ui'
import { ProfileFullness } from '@/entities/viewer/ui/profile-fullness-panel'

export const FiltersContent: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car', 'common'])
  const carType = useAtomValue(carCollectionType)
  const hasFiltersChanged = useAtomValue(hasFiltersChangedAtom)

  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)

  return (
    <div className={cn('flex flex-col w-full bg-white pt-base desktop:pt-5', className)}>
      <div className='flex flex-col gap-5 px-5 border-b border-black pb-large desktop:gap-3'>
        <ProductTypeTabs />
        <ProductBrandSelect/>
        <ProductModelSelect />
      </div>
      {/* TODO: Сделать логику валют, когда будет мультивалютность */}
      <FilterDisclosure defaultOpen label={`${t('Price')} ₽`}>
        <CarPriceRange />
      </FilterDisclosure>
      <ProfileFullness className='my-3'/>
      <FilterDisclosure label={t('Color')} panelClassName='px-small'>
        <CarExteriorColorPalette className='px-5 mb-large' />
      </FilterDisclosure>
      <div className='items-center justify-between hidden px-5 desktop:flex py-large'>
        <FiltersResetButton />
        <Button disabled={!hasFiltersChanged} onClick={() => setIsFiltersApply(true)}>
          {t('common:Apply')}
        </Button>
      </div>
    </div>
  )
}
