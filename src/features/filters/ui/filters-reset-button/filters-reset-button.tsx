import {
  carCollectionBodyType,
  carCollectionBrand,
  carCollectionConfiguration,
  carCollectionDealer,
  carCollectionDriveType,
  carCollectionEcoType,
  carCollectionEnginePower,
  carCollectionEngineVolume,
  carCollectionExteriorColors,
  carCollectionFuelType,
  carCollectionGeneration,
  carCollectionInteriorColors,
  carCollectionLocation,
  carCollectionManufacturer,
  carCollectionManufacturerCountry,
  carCollectionMileage,
  carCollectionModel,
  carCollectionOrder,
  carCollectionOwners,
  carCollectionPrice,
  carCollectionTransmissionType,
  carCollectionType,
  carCollectionYears,
  isFiltersApplyAtom,
} from '@/entities/car'
import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { useResetAtom, useUpdateAtom } from 'jotai/utils'

export const FiltersResetButton: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['common'])

  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)

  const resetType = useResetAtom(carCollectionType)
  const resetBrand = useResetAtom(carCollectionBrand)
  const resetModel = useResetAtom(carCollectionModel)
  const resetGeneration = useResetAtom(carCollectionGeneration)
  const resetLocation = useResetAtom(carCollectionLocation)
  const resetManufacturerLocation = useResetAtom(carCollectionManufacturerCountry)
  const resetBodyType = useResetAtom(carCollectionBodyType)
  const resetManufacturer = useResetAtom(carCollectionManufacturer)
  const resetDealer = useResetAtom(carCollectionDealer)
  const resetFuelType = useResetAtom(carCollectionFuelType)
  const resetTransmissionType = useResetAtom(carCollectionTransmissionType)
  const resetDriveType = useResetAtom(carCollectionDriveType)
  const resetEcoType = useResetAtom(carCollectionEcoType)
  const resetConfiguration = useResetAtom(carCollectionConfiguration)
  const resetPrice = useResetAtom(carCollectionPrice)
  const resetMileage = useResetAtom(carCollectionMileage)
  const resetOwners = useResetAtom(carCollectionOwners)
  const resetYears = useResetAtom(carCollectionYears)
  const resetEnginePower = useResetAtom(carCollectionEnginePower)
  const resetEngineVolume = useResetAtom(carCollectionEngineVolume)
  const resetOrder = useResetAtom(carCollectionOrder)
  const resetInteriorColors = useResetAtom(carCollectionInteriorColors)
  const resetExteriorColors = useResetAtom(carCollectionExteriorColors)

  const resetAll = () => {
    resetType()
    resetBrand()
    resetModel()
    resetGeneration()
    resetLocation()
    resetManufacturerLocation()
    resetBodyType()
    resetManufacturer()
    resetDealer()
    resetFuelType()
    resetTransmissionType()
    resetDriveType()
    resetEcoType()
    resetConfiguration()
    resetPrice()
    resetMileage()
    resetOwners()
    resetYears()
    resetEnginePower()
    resetType()
    resetEngineVolume()
    resetOrder()
    resetInteriorColors()
    resetExteriorColors()
    setIsFiltersApply(true)
  }
  return (
    <Button variant='text' onClick={resetAll} className={className}>
      {t('Reset all')}
    </Button>
  )
}
