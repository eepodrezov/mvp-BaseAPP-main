import { Nullable } from '@/shared/@types'

export type Steps = 1 | 2 | 3 | 4
export interface User {
  id: number
  isAgreementAccepted: boolean
  firstName: string
  lastName: string
  middleName: string
  fullName: string
  isRealEmail: boolean
  username: string
  enabled: boolean
  email: string
  roles: string[]
  phone: string
  isExternalUser: boolean
  isEmailConfirmed: boolean
  isPhoneConfirmed: boolean
  isTelegramConfirmed: boolean
  telegram: string
}
export type UserDocument = {
  id?: number
  firstName: string
  middleName: string
  lastName: string
  dateBirthday: Nullable<Date>
  seriesAndNumber: Nullable<string>
  dateIssue: Nullable<Date>
  agency: Nullable<string>
  divisionCode: Nullable<number>
  snils?: Nullable<string>
  inn: Nullable<string>
  registerCity: Nullable<string>
  registerCountry: Nullable<string>
  registerProvince: Nullable<string>
  registerAddress: Nullable<string>
  registerDate: Nullable<Date>
  registerPostalCode: Nullable<string>
}

export type RequestCallback = {
  phone: string
  comment: string
  currentLink: string
}
