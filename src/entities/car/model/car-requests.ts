import { CollectionResponse } from '@/shared/@types'
import { queryFetchFactory, httpClient, getSingleRequestTarget } from '@/shared/lib'
import {
  Brand,
  Car,
  Model,
  CARS_REQUEST_TARGET,
  BRANDS_REQUEST_TARGET,
  MODELS_REQUEST_TARGET,
  COLORS_REQUEST_TARGET,
  Color,
  Generation,
  GENERATIONS_REQUEST_TARGET,
  MANUFACTURERS_REQUEST_TARGET,
  Manufacturer,
  Dealer,
  DEALERS_REQUEST_TARGET,
  BODY_TYPES_REQUEST_TARGET,
  BodyType,
  CONFIGURATIONS_REQUEST_TARGET,
  Configuration,
  FILTER_DATA_REQUEST_TARGET,
  CarFilterData,
  CAR_REQUEST_TARGET,
  COUNTRIES_REQUEST_TARGET,
  Country,
  FAVORITES_REQUEST_TARGET,
  ResponseFavoriteReq,
  CarCollectionItem,
  MATERIALS_REQUEST_TARGET,
} from '../lib'
import { AxiosRequestConfig } from 'axios'

export const fetchCars = (config: AxiosRequestConfig) =>
  httpClient<CollectionResponse<CarCollectionItem>>({
    ...config,
    url: CARS_REQUEST_TARGET,
  })

export const queryFetchCars = queryFetchFactory<CollectionResponse<CarCollectionItem>>(CARS_REQUEST_TARGET)

export const queryFetchCarById = (carId: number) =>
  queryFetchFactory<Car>(getSingleRequestTarget(carId, CAR_REQUEST_TARGET))

export const queryFetchBrands = queryFetchFactory<CollectionResponse<Brand>>(BRANDS_REQUEST_TARGET)

export const queryFetchModels = queryFetchFactory<CollectionResponse<Model>>(MODELS_REQUEST_TARGET)

export const queryFetchBodyTypes = queryFetchFactory<CollectionResponse<BodyType>>(BODY_TYPES_REQUEST_TARGET)

export const queryFetchGenerations = queryFetchFactory<CollectionResponse<Generation>>(GENERATIONS_REQUEST_TARGET)

export const queryFetchColors = queryFetchFactory<CollectionResponse<Color>>(COLORS_REQUEST_TARGET)

export const queryFetchMaterials = queryFetchFactory<CollectionResponse<Color>>(MATERIALS_REQUEST_TARGET)

export const queryFetchCountries = queryFetchFactory<CollectionResponse<Country>>(COUNTRIES_REQUEST_TARGET)

export const queryFetchManufacturers = queryFetchFactory<CollectionResponse<Manufacturer>>(MANUFACTURERS_REQUEST_TARGET)

export const queryFetchDealers = queryFetchFactory<CollectionResponse<Dealer>>(DEALERS_REQUEST_TARGET)

export const queryFetchConfigurations =
  queryFetchFactory<CollectionResponse<Configuration>>(CONFIGURATIONS_REQUEST_TARGET)

export const queryFetchFilterData = queryFetchFactory<CarFilterData>(FILTER_DATA_REQUEST_TARGET)

export const queryFetchFavorites = (carId: number) =>
  queryFetchFactory<ResponseFavoriteReq>(getSingleRequestTarget(carId, FAVORITES_REQUEST_TARGET), {
    method: 'PATCH',
    data: {},
  })
