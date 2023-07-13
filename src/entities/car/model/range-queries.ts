import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchFilterData } from './car-requests'
import { CarFilterData, FILTER_DATA_COLLECTION_PRIMARY_KEY, CAR_COLLECTION_INITIAL_FILTERS } from '../lib'
import { useAtomValue } from 'jotai'
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
  carCollectionOwners,
  carCollectionPrice,
  carCollectionTransmissionType,
  carCollectionType,
  carCollectionAge,
  carCollectionIsCustomUnion,
} from './car-collection-query'
import { getBetweenFilterValue } from '@/shared/helpers'

const rangesCollectionQuery = queryFactory(
  FILTER_DATA_COLLECTION_PRIMARY_KEY,
  queryFetchFilterData,
  CAR_COLLECTION_INITIAL_FILTERS
)()

export const useRangesCollection = (params?: QueryParams<CarFilterData>) => {
  const { locale } = useRouter()
  const type = useAtomValue(carCollectionType)
  const brand = useAtomValue(carCollectionBrand)
  const model = useAtomValue(carCollectionModel)
  const generation = useAtomValue(carCollectionGeneration)
  const location = useAtomValue(carCollectionLocation)
  const isCustomUnion = useAtomValue(carCollectionIsCustomUnion)
  const manufacturerLocation = useAtomValue(carCollectionManufacturerCountry)
  const bodyType = useAtomValue(carCollectionBodyType)
  const manufacturer = useAtomValue(carCollectionManufacturer)
  const dealer = useAtomValue(carCollectionDealer)
  const fuelType = useAtomValue(carCollectionFuelType)
  const transmissionType = useAtomValue(carCollectionTransmissionType)
  const driveType = useAtomValue(carCollectionDriveType)
  const ecoType = useAtomValue(carCollectionEcoType)
  const configuration = useAtomValue(carCollectionConfiguration)
  const price = useAtomValue(carCollectionPrice)
  const mileage = useAtomValue(carCollectionMileage)
  const owners = useAtomValue(carCollectionOwners)
  const age = useAtomValue(carCollectionAge)
  const enginePower = useAtomValue(carCollectionEnginePower)
  const literEngineVolume = useAtomValue(carCollectionEngineVolume)
  const interiorColors = useAtomValue(carCollectionInteriorColors)
  const exteriorColors = useAtomValue(carCollectionExteriorColors)
  return rangesCollectionQuery.useHookInitializer(
    {
      type,
      brand,
      model,
      generation,
      'location.country.id': location,
      'location.country.isCustomUnion': isCustomUnion,
      'manufacturer.location.country': manufacturerLocation,
      bodyType,
      manufacturer,
      dealer,
      fuelType,
      transmissionType,
      driveType,
      ecoType,
      configuration,
      interiorColors,
      exteriorColors,
      'price.value[gte]': price?.[0],
      'price.value[lte]': price?.[1],
      'mileage[between]': getBetweenFilterValue(mileage),
      'ownersCount[between]': getBetweenFilterValue(owners),
      'age[between]': getBetweenFilterValue(age),
      'enginePower[between]': getBetweenFilterValue(enginePower),
      'literEngineVolume[between]': getBetweenFilterValue(literEngineVolume),
      locale,
    },
    params
  )
}
