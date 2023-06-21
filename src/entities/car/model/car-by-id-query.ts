import { queryFactory, QueryParams } from '@/shared/lib'
import { useRouter } from 'next/router'
import { Car, CAR_SINGLE_PRIMARY_KEY } from '../lib'
import { queryFetchCarById } from './car-requests'

const carQuery = (carId: number) => queryFactory([...CAR_SINGLE_PRIMARY_KEY, carId], queryFetchCarById(carId))()

export const prefetchCarById = (carId: number) => carQuery(carId).prefetch

export const useGetCar = (carId: number, params?: QueryParams<Car>) => {
  const { locale } = useRouter()

  return carQuery(carId).useHookInitializer({ locale }, params)
}
