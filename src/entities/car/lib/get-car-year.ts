import { Car, CarCollectionItem } from './types'
export function getCarYear(car: Car | CarCollectionItem) {
  if (car?.year === 0) {
    return new Date(car?.firstRegDate).getFullYear()
  }
  return car?.year
}
