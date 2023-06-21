import { BaseEntity } from '@/shared/@types'

export type RequestUserSettings = Omit<ResponseUserSettings, 'dateCreate' | 'dateUpdate'>

export interface ResponseUserSettings extends BaseEntity {
  email: boolean
  sms: boolean
  telegram: boolean
}
