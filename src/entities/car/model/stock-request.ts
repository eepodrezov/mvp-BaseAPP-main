import { CollectionResponse } from '@/shared/@types'
import { getSingleRequestTarget, queryFetchFactory } from '@/shared/lib'
import {
  CarStockItem,
  STOCK_COLLECTION_REQUEST_TARGET,
  STOCK_SINGLE_DELETE_REQUEST_TARGET,
  STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET,
} from '../lib'

export const queryFetchStockCollection = queryFetchFactory<CollectionResponse<CarStockItem>>(
  STOCK_COLLECTION_REQUEST_TARGET
)

export const queryFetchStockDelete = (carId: number) =>
  queryFetchFactory<CarStockItem>(getSingleRequestTarget(carId, STOCK_SINGLE_DELETE_REQUEST_TARGET), {
    data: { blocked: true },
    method: 'PUT',
  })

export const queryFetchStockUpdateVisible = (carId: number) =>
  queryFetchFactory<CarStockItem>(getSingleRequestTarget(carId, STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET), {
    data: {},
    method: 'PUT',
  })
