import { User } from '@/entities/viewer'
import { BaseEntity, FileModel, Nullable, ObjectWithName } from '@/shared/@types'
import {
  CAR_FAVORITE_ADD,
  CAR_FAVORITE_REMOVED,
  CAR_TYPE_DRIVE_4WD,
  CAR_TYPE_DRIVE_AWD,
  CAR_TYPE_DRIVE_FWD,
  CAR_TYPE_DRIVE_RWD,
  CAR_TYPE_ECO_EURO_1,
  CAR_TYPE_ECO_EURO_2,
  CAR_TYPE_ECO_EURO_3,
  CAR_TYPE_ECO_EURO_4,
  CAR_TYPE_ECO_EURO_5,
  CAR_TYPE_ECO_EURO_6,
  CAR_TYPE_FUEL_LPG,
  CAR_TYPE_FUEL_NATURAL_GAS,
  CAR_TYPE_FUEL_HYDROGEN,
  CAR_TYPE_FUEL_DIESEL,
  CAR_TYPE_FUEL_ELECTRO,
  CAR_TYPE_FUEL_HYBRID,
  CAR_TYPE_FUEL_PETROL,
  CAR_TYPE_NEW,
  CAR_TYPE_TRANSMISSION_AUTOMATIC,
  CAR_TYPE_TRANSMISSION_MECHANICS,
  CAR_TYPE_TRANSMISSION_ROBOT,
  CAR_TYPE_TRANSMISSION_VARIABLE_SPEED_DRIVE,
  CAR_TYPE_USED,
  COLOR_TYPE_BODY,
  COLOR_TYPE_INTER,
} from './constants'

export type CarType = typeof CAR_TYPE_NEW | typeof CAR_TYPE_USED

export type CarFuelType =
  | typeof CAR_TYPE_FUEL_PETROL
  | typeof CAR_TYPE_FUEL_DIESEL
  | typeof CAR_TYPE_FUEL_HYBRID
  | typeof CAR_TYPE_FUEL_ELECTRO
  | typeof CAR_TYPE_FUEL_LPG
  | typeof CAR_TYPE_FUEL_NATURAL_GAS
  | typeof CAR_TYPE_FUEL_HYDROGEN

export type CarTransmissionType =
  | typeof CAR_TYPE_TRANSMISSION_AUTOMATIC
  | typeof CAR_TYPE_TRANSMISSION_ROBOT
  | typeof CAR_TYPE_TRANSMISSION_VARIABLE_SPEED_DRIVE
  | typeof CAR_TYPE_TRANSMISSION_MECHANICS

export type CarDriveType =
  | typeof CAR_TYPE_DRIVE_FWD
  | typeof CAR_TYPE_DRIVE_RWD
  | typeof CAR_TYPE_DRIVE_4WD
  | typeof CAR_TYPE_DRIVE_AWD

export type CarEcoType =
  | typeof CAR_TYPE_ECO_EURO_1
  | typeof CAR_TYPE_ECO_EURO_2
  | typeof CAR_TYPE_ECO_EURO_3
  | typeof CAR_TYPE_ECO_EURO_4
  | typeof CAR_TYPE_ECO_EURO_5
  | typeof CAR_TYPE_ECO_EURO_6

export type ManufactureType = {
  name: string
  location: Location
}

export interface Car extends BaseEntity {
  name: string
  brand: ObjectWithName
  model: ObjectWithName
  configuration: string
  type: CarType
  images: FileModel[]
  year: number
  ownersCount: number
  mileage: number
  dealer: ObjectWithName
  price: {
    currency: Currency
    value: number
    rubValue: number
    id: number
  }
  prices: {
    value: number
  }[]
  vin: string
  location: Location
  manufacturer: ManufactureType
  blocked: boolean
  booked: boolean
  firstRegDate: string
  dateOfManufacturer: string
  colors: Color[]
  isFavorite: boolean
  bodyType: ObjectWithName
  diveType: number
  driveType: CarDriveType
  fuelType: CarFuelType
  transmissionType: CarTransmissionType
  interiorMaterials: string
  generation: string
  interiorColors: Color[]
  ecoType: number
  enginePower: number
  engineVolume: number
  literEngineVolume: number
  visible: boolean
  user: Nullable<User>
}

export interface CarBase extends BaseEntity {
  name: string
  images: FileModel[]
  literEngineVolume: number
  firstRegDate: string
  enginePower: number
  price: {
    currency: Currency
    value: number
    rubValue: number
    id: number
  }
}

export interface CarCollectionItem extends CarBase {
  brand: ObjectWithName
  model: ObjectWithName
  year: number
  mileage: number
  location: Location
  isFavorite: boolean
  driveType: CarDriveType
  fuelType: CarFuelType
  transmissionType: CarTransmissionType
}

export interface CarFavoriteItem extends CarBase {
  blocked: boolean
  visible: boolean
}

export interface CarStockItem extends CarBase {
  booked: boolean
  visible: boolean
}

export interface Brand extends BaseEntity {
  name: string
  canonicalName: string
  cars: (string | Car)[]
  models: (string | Model)[]
}

export interface Model extends BaseEntity {
  name: string
  canonicalName: string
  brand: string | Brand
  cars: (string | Car)[]
  configurations: (string | Configuration)[]
  colors: (string | Color)[]
  bodyTypes: (string | BodyType)[]
}

// TODO: Изменить, когда будет на бэке
export interface Generation extends BaseEntity {
  name: string
  canonicalName: string
  model: string | Model
}

export interface Configuration extends BaseEntity {
  cars: (string | Car)[]
  model: string
  name: string
}

export interface Dealer extends BaseEntity {
  name: string
  cars: (string | Car)[]
  address: string | Address
}

export interface Color extends BaseEntity {
  name: string
  hex: string
  models: (string | Model)[]
  cars: (string | Car)[]
  type: typeof COLOR_TYPE_INTER | typeof COLOR_TYPE_BODY
}

export interface BodyType extends BaseEntity {
  name: string
  icon: string
  models: (string | Model)[]
  cars: (string | Car)[]
}

export interface Address extends BaseEntity {
  city: string
  country: string
  street: string
  floor: string
  num: string
  comment: string
  zip: string
}
export interface Manufacturer extends BaseEntity {
  name: string
  cars: (string | Car)[]
  location: string | Address
}

export interface CarFilterData {
  price_min: number
  price_max: number
  mileage_min: number
  mileage_max: number
  owners_min: number
  owners_max: number
  years_min: number
  years_max: number
  enginePower_min: number
  enginePower_max: number
  engineVolume_min: number
  engineVolume_max: number
}
export interface Country extends BaseEntity {
  address: string[]
  internationalDeliveryPrice: string[]
  name: string
}
export interface Location {
  city: string
  country: {
    id: number
    name: string
  }
}

export interface ProfileCar extends BaseEntity {
  name: string
  images: FileModel[]
  firstRegDate: string
  enginePower: number
  literEngineVolume: number
}

export interface Currency {
  id: number
  name: string
  symbol: string
}

export interface ResponseFavoriteReq {
  message: typeof CAR_FAVORITE_ADD | typeof CAR_FAVORITE_REMOVED
}

export interface FavoriteCar extends BaseEntity {
  user: User
  car: CarFavoriteItem
}

export interface Prices extends BaseEntity {
  cars: string[]
  car: string
  isMain: boolean
  date: string
  currency: string
  value: number
  rubValue: number
  internationalDeliveryPrice: number
  domesticDeliveryPrice: number
  customClearancePrice: number
}
