import { filterAtomsFactory, queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { queryFetchCars } from './car-requests'
import {
  CAR_COLLECTION_INITIAL_FILTERS_ATOM_VALUES,
  CAR_COLLECTION_INITIAL_FILTERS,
  CAR_COLLECTION_PRIMARY_KEY,
  CarCollectionItem,
} from '../lib'
import { CollectionResponse } from '@/shared/@types'
import { useAtom, useAtomValue } from 'jotai'
import { getBetweenFilterValue } from '@/shared/helpers'
import { useEffect, useState } from 'react'
import { hasFiltersChangedAtom, isFiltersApplyAtom } from './store'

export const {
  page: carCollectionPage,
  itemsPerPage: carCollectionPageSize,
  type: carCollectionType,
  brand: carCollectionBrand,
  model: carCollectionModel,
  generation: carCollectionGeneration,
  'location.country.name': carCollectionLocation,
  'manufacturer.location.country': carCollectionManufacturerCountry,
  bodyType: carCollectionBodyType,
  manufacturer: carCollectionManufacturer,
  dealer: carCollectionDealer,
  fuelType: carCollectionFuelType,
  transmissionType: carCollectionTransmissionType,
  driveType: carCollectionDriveType,
  ecoType: carCollectionEcoType,
  configuration: carCollectionConfiguration,
  price: carCollectionPrice,
  'mileage[between]': carCollectionMileage,
  'ownersCount[between]': carCollectionOwners,
  'year[between]': carCollectionYears,
  'enginePower[between]': carCollectionEnginePower,
  'literEngineVolume[between]': carCollectionEngineVolume,
  order: carCollectionOrder,
  interiorColors: carCollectionInteriorColors,
  сolors: carCollectionExteriorColors,
} = filterAtomsFactory(CAR_COLLECTION_INITIAL_FILTERS_ATOM_VALUES, { storageType: 'query' })

const carsCollectionQuery = queryFactory(
  CAR_COLLECTION_PRIMARY_KEY,
  queryFetchCars,
  CAR_COLLECTION_INITIAL_FILTERS
)(filters => {
  delete filters.order
  return { params: filters }
})

export const prefetchCarCollection = carsCollectionQuery.prefetch

export const useCarCollection = (params?: QueryParams<CollectionResponse<CarCollectionItem>>) => {
  const [hasFiltersChanged, setHasFiltersChanged] = useAtom(hasFiltersChangedAtom)
  const [isFiltersApply, setIsFiltersApply] = useAtom(isFiltersApplyAtom)

  //TODO: оптимизировать в base app
  const { locale, events } = useRouter()
  const [page, setPage] = useAtom(carCollectionPage)
  const itemsPerPage = useAtomValue(carCollectionPageSize)
  const type = useAtomValue(carCollectionType)
  const brand = useAtomValue(carCollectionBrand)
  const model = useAtomValue(carCollectionModel)
  const generation = useAtomValue(carCollectionGeneration)
  const location = useAtomValue(carCollectionLocation)
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
  const years = useAtomValue(carCollectionYears)
  const enginePower = useAtomValue(carCollectionEnginePower)
  const literEngineVolume = useAtomValue(carCollectionEngineVolume)
  const order = useAtomValue(carCollectionOrder)
  const interiorColors = useAtomValue(carCollectionInteriorColors)
  const сolors = useAtomValue(carCollectionExteriorColors)

  const filters = {
    type,
    brand,
    model,
    generation,
    'location.country.name': location,
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
    сolors,
    'price.value[gte]': price?.[0],
    'price.value[lte]': price?.[1],
    'mileage[between]': getBetweenFilterValue(mileage),
    'ownersCount[between]': getBetweenFilterValue(owners),
    'age[between]': getBetweenFilterValue(years),
    'enginePower[between]': getBetweenFilterValue(enginePower),
    'literEngineVolume[between]': getBetweenFilterValue(literEngineVolume),
  }

  const [currentFilters, setCurrentFilters] = useState(filters)

  useEffect(() => {
    const setApply = () => setIsFiltersApply(true)
    events.on('routeChangeComplete', setApply)
    return () => events.off('routeChangeComplete', setApply)
  }, [])

  useEffect(() => {
    if (isFiltersApply) {
      setCurrentFilters(filters)
      setIsFiltersApply(false)
      hasFiltersChanged && setPage(1)
    }
  }, [isFiltersApply])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  type FilterKey = keyof typeof filters

  setHasFiltersChanged(
    !!Object.keys(filters).find(key => filters[key as FilterKey] !== currentFilters[key as FilterKey])
  )

  return carsCollectionQuery.useHookInitializer(
    { ...currentFilters, page, itemsPerPage, ...(order && { [order.field]: order.order }), locale },
    params
  )
}
