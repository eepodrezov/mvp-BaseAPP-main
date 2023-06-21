import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { LANG_RU, LANG_EN, THEME_DARK, THEME_LIGHT, SORT_ASC, SORT_DESC } from '@/shared/config'
import { FCWithChildren } from './utils'
import { RESET } from 'jotai/utils'
import { SetStateAction } from 'jotai'
import dayjs from 'dayjs'

export type NextPageWithLayout<T = {}> = NextPage & {
  Layout?: FCWithChildren<T>
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type ThemeType = typeof THEME_LIGHT | typeof THEME_DARK

export type Sort = typeof SORT_ASC | typeof SORT_DESC

export type SortAtom = [Sort, (update: typeof RESET | SetStateAction<Sort>) => void]

export type TFunction = (str: string) => string

export type Language = typeof LANG_RU | typeof LANG_EN

export interface BaseEntity {
  id: number
  dateCreate: string
  dateUpdate: string
}

export interface SelectOption {
  id: number | string
  label: string
  disabled?: boolean
}

export interface BaseEntity {
  id: number
  dateCreate: string
  dateUpdate: string
}

export interface CollectionResponse<T> {
  countOfPages: number
  items: T[]
  itemsPerPage: number
  totalItems: number
}

export interface FileModel extends BaseEntity {
  name: string
  pathS3?: string
  path: string
  isFullPath: boolean
  loading?: boolean
}

export type ObjectWithName = {
  name: string
}

export type JWT_Token = string

export type Color =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'lines'
  | 'backgroundPrimary'
  | 'backgroundSecondary'
  | 'backgroundHover'
  | 'red'
  | 'white'
  | 'buttonPressPrimary'
  | 'buttonPressSecondary'
  | 'orange'
  | 'green'

export type FieldType = 'text' | 'number' | 'date'

export type FormField = {
  label: string
  type: FieldType
  notRequired?: boolean
  isRequired?: boolean
  min?: number
  max?: number
  defaultPickerValue?: dayjs.Dayjs
  //всегда отправляем строки, FieldType идет для валидации значений,
  //  но в некоторых случаях отправляет число
  postAsNumber?: boolean
  isOnlyRu?: boolean
}

export type FormStep = {
  stepTitle: string
  stepTitleRu: string
  stepFields: FormField[]
  isBottomWarning?: boolean
}
