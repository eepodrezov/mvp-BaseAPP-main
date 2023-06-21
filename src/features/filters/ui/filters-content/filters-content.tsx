import {
  CarBrandSelect,
  carCollectionType,
  CarModelSelect,
  CarOwnersRange,
  CarPriceRange,
  CarTypeTabs,
  CarYearsRange,
  CAR_TYPE_USED,
  CarEnginePowerRange,
  CarEngineVolumeRange,
  CarFuelTypeSelect,
  CarManufacturerCountrySelect,
  CarManufacturerSelect,
  CarDealerSelect,
  CarLocationSelect,
  CarMileageRange,
  CarTransmissionTypeSelect,
  CarDriveTypeSelect,
  CarEcoTypeSelect,
  CarExteriorColorPalette,
  CarInteriorColorPalette,
  hasFiltersChangedAtom,
  isFiltersApplyAtom,
} from '@/entities/car'
import { Button, FilterDisclosure } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import cn from 'classnames'
import { FiltersResetButton } from '../filters-reset-button'
import { useTranslate } from '@/shared/lib'
import { useUpdateAtom } from 'jotai/utils'
import { FCWithClassName } from '@/shared/@types'

export const FiltersContent: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car', 'common'])
  const carType = useAtomValue(carCollectionType)
  const hasFiltersChanged = useAtomValue(hasFiltersChangedAtom)

  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)

  return (
    <div className={cn('flex flex-col w-full bg-white pt-base desktop:pt-5', className)}>
      <div className='flex flex-col gap-5 px-5 border-b border-black pb-large desktop:gap-3'>
        <CarTypeTabs />
        <CarBrandSelect />
        <CarModelSelect />
        {/* <CarConfigurationSelect /> */}
        {/* <CarBodyTypeSelect /> */}
        {/* TODO: Вернуть, когда на бэке сделают реализацию */}
        {/* <CarGenerationSelect /> */}
        <CarLocationSelect />
      </div>
      {/* TODO: Сделать логику валют, когда будет мультивалютность */}
      <FilterDisclosure defaultOpen label={`${t('Price')} ₽`}>
        <CarPriceRange />
      </FilterDisclosure>
      <FilterDisclosure defaultOpen label={t('Age')}>
        <CarYearsRange />
      </FilterDisclosure>

      <FilterDisclosure label={t('Ownership')} panelClassName='text-black source-text pt-small'>
        {carType === CAR_TYPE_USED && (
          <>
            <p className='mb-small'>{t('Owners')}</p>
            <CarOwnersRange className='mb-5' />
            <p className='mb-small'>{t('mileage')}</p>
            <CarMileageRange className='mb-5' />
          </>
        )}
        <CarDealerSelect />
      </FilterDisclosure>

      <FilterDisclosure label={t('Engine')} panelClassName='text-black source-text pt-small'>
        <CarFuelTypeSelect className='mb-large' />
        <p className='mb-small'>{t('engineVolume')}</p>
        <CarEngineVolumeRange className='mb-large' />
        <p className='mb-small'>{t('enginePower')}</p>
        <CarEnginePowerRange className='mb-large' />
        <CarEcoTypeSelect />
      </FilterDisclosure>
      <FilterDisclosure label={t('TransmissionBlock')}>
        <div className='flex flex-col gap-5 pt-small'>
          <CarTransmissionTypeSelect />
          <CarDriveTypeSelect />
        </div>
      </FilterDisclosure>
      <FilterDisclosure label={t('Color')} panelClassName='px-small'>
        <CarExteriorColorPalette className='px-5 mb-large' />
        <CarInteriorColorPalette className='px-5 pt-large border-t' />
      </FilterDisclosure>
      <FilterDisclosure label={t('Make')} className='px-0 mb-20 desktop:mb-0' panelClassName='pt-small'>
        <CarManufacturerCountrySelect className='mb-5' />
        <CarManufacturerSelect />
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
