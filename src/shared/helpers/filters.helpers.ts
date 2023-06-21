import dayjs, { Dayjs } from 'dayjs'
import { Nullable, SelectOption, Sort } from '@/shared/@types'
import { getObjectWithoutEmptyProperty } from './object.helpers'
import { OrderValue } from '../ui'

export const getSelectOptionsFromListOfConstants = (list: string[]): SelectOption[] =>
  list.map(el => ({ id: el, label: el }))

export const getDateRangeFilters = (data: Record<string, Nullable<Dayjs>>) => {
  const object = getObjectWithoutEmptyProperty(data)
  return Object.keys(object).reduce((arr, key) => ({ ...arr, [key]: dayjs(object[key]).format() }), {})
}

export const getOrderValue = (option: Omit<SelectOption, 'id'> & { id: string }, order: Sort) => ({
  field: option.id,
  order,
  label: option.label,
})

export const getOrderEqual = (a?: Nullable<OrderValue>, b?: Nullable<OrderValue>) =>
  a?.field === b?.field && a?.order === b?.order

export const getBetweenFilterValue = (value: Nullable<number[]>) => value && value.join('..')
