import { ProfileCar } from '@/entities/car'
import { User } from '@/entities/viewer'
import { BaseEntity, FileModel } from '@/shared/@types'
import {
  STATUS_BOOKING_CANCELLATION_BY_MANAGER,
  STATUS_BOOKING_CANCELLATION_BY_USER,
  STATUS_BOOKING_PAYMENT_ERROR,
  STATUS_BOOKING_SUCCESS,
  STATUS_BOOKING_TIME_IS_OVER,
  STATUS_BOOKING_WAITING_FOR_BOOKING_ANTCAR,
  STATUS_BOOKING_WAITING_FOR_PAYMENT,
  STATUS_BOOKING_WAITING_FOR_USER_INPUT,
  STATUS_CUSTOMS_CLEARANCE_STOP,
  STATUS_CUSTOMS_CLEARANCE_SUCCESS,
  STATUS_CUSTOMS_CLEARANCE_WAITING_FOR_PAYMENT_ANTCAR,
  STATUS_CUSTOMS_CLEARANCE_WAITING_FOR_USER_PAYMENT,
  STATUS_INTERNATIONAL_SHIPPING_DEADLINE_AWAITING_PAYMENT,
  STATUS_INTERNATIONAL_SHIPPING_NOT_DELIVERY,
  STATUS_INTERNATIONAL_SHIPPING_PAYMENT_ANTCAR_ERROR,
  STATUS_INTERNATIONAL_SHIPPING_PAYMENT_ANTCAR_SUCCESS,
  STATUS_INTERNATIONAL_SHIPPING_STOP,
  STATUS_INTERNATIONAL_SHIPPING_SUCCESS,
  STATUS_INTERNATIONAL_SHIPPING_USER_PAYMENT_SUCCESS,
  STATUS_INTERNATIONAL_SHIPPING_WAITING_FOR_PAYMENT_ANTCAR,
  STATUS_INTERNATIONAL_SHIPPING_WAITING_FOR_USER_PAYMENT,
  STATUS_LOCAL_DELIVERY_DEADLINE_AWAITING_USER_PAYMENT,
  STATUS_LOCAL_DELIVERY_NOT_DELIVERY,
  STATUS_LOCAL_DELIVERY_PAYMENT_ANTCAR_ERROR,
  STATUS_LOCAL_DELIVERY_PAYMENT_ANTCAR_SUCCESS,
  STATUS_LOCAL_DELIVERY_STOP,
  STATUS_LOCAL_DELIVERY_SUCCESS,
  STATUS_LOCAL_DELIVERY_USER_PAYMENT_SUCCESS,
  STATUS_LOCAL_DELIVERY_WAITING_FOR_PAYMENT_ANTCAR,
  STATUS_LOCAL_DELIVERY_WAITING_FOR_USER_PAYMENT,
  STATUS_PAYMENT_AUTO_PAYMENT_ANTCAR_ERROR,
  STATUS_PAYMENT_CHOICE_OF_METHOD,
  STATUS_PAYMENT_DEADLINE_AWAITING_PAYMENT,
  STATUS_PAYMENT_PAYMENT_CANCELLATION,
  STATUS_PAYMENT_SUCCESS_PAYMENT,
  STATUS_PAYMENT_SUCCESS_RECEPTION_BOX_OFFICE,
  STATUS_PAYMENT_USER_PAYMENT_SUCCESS,
  STATUS_PAYMENT_WAITING_FOR_INPUT,
  STATUS_PAYMENT_WAITING_FOR_RECEPTION_CASH_DESK,
  STATUS_PAYMENT_WAITING_FOR_USER_PAYMENT,
  STEP_CUSTOMS_CLEARANCE,
  STEP_LOCAL_DELIVERY,
  STEP_TYPE_BOOKING,
  STEP_TYPE_INTERNATIONAL_SHIPPING,
  STEP_TYPE_PAYMENT,
} from './constants'

export type PaymentStatus =
  | typeof STATUS_BOOKING_WAITING_FOR_PAYMENT
  | typeof STATUS_BOOKING_WAITING_FOR_USER_INPUT
  | typeof STATUS_BOOKING_CANCELLATION_BY_USER
  | typeof STATUS_BOOKING_CANCELLATION_BY_MANAGER
  | typeof STATUS_BOOKING_WAITING_FOR_BOOKING_ANTCAR
  | typeof STATUS_BOOKING_SUCCESS
  | typeof STATUS_BOOKING_PAYMENT_ERROR
  | typeof STATUS_BOOKING_TIME_IS_OVER
  | typeof STATUS_PAYMENT_CHOICE_OF_METHOD
  | typeof STATUS_PAYMENT_WAITING_FOR_INPUT
  | typeof STATUS_PAYMENT_WAITING_FOR_USER_PAYMENT
  | typeof STATUS_PAYMENT_WAITING_FOR_RECEPTION_CASH_DESK
  | typeof STATUS_PAYMENT_DEADLINE_AWAITING_PAYMENT
  | typeof STATUS_PAYMENT_PAYMENT_CANCELLATION
  | typeof STATUS_PAYMENT_USER_PAYMENT_SUCCESS
  | typeof STATUS_PAYMENT_SUCCESS_RECEPTION_BOX_OFFICE
  | typeof STATUS_PAYMENT_AUTO_PAYMENT_ANTCAR_ERROR
  | typeof STATUS_PAYMENT_SUCCESS_PAYMENT
  | typeof STATUS_INTERNATIONAL_SHIPPING_WAITING_FOR_USER_PAYMENT
  | typeof STATUS_INTERNATIONAL_SHIPPING_WAITING_FOR_PAYMENT_ANTCAR
  | typeof STATUS_INTERNATIONAL_SHIPPING_DEADLINE_AWAITING_PAYMENT
  | typeof STATUS_INTERNATIONAL_SHIPPING_STOP
  | typeof STATUS_INTERNATIONAL_SHIPPING_USER_PAYMENT_SUCCESS
  | typeof STATUS_INTERNATIONAL_SHIPPING_PAYMENT_ANTCAR_ERROR
  | typeof STATUS_INTERNATIONAL_SHIPPING_PAYMENT_ANTCAR_SUCCESS
  | typeof STATUS_INTERNATIONAL_SHIPPING_NOT_DELIVERY
  | typeof STATUS_INTERNATIONAL_SHIPPING_SUCCESS
  | typeof STATUS_CUSTOMS_CLEARANCE_WAITING_FOR_USER_PAYMENT
  | typeof STATUS_CUSTOMS_CLEARANCE_WAITING_FOR_PAYMENT_ANTCAR
  | typeof STATUS_CUSTOMS_CLEARANCE_STOP
  | typeof STATUS_CUSTOMS_CLEARANCE_SUCCESS
  | typeof STATUS_LOCAL_DELIVERY_WAITING_FOR_USER_PAYMENT
  | typeof STATUS_LOCAL_DELIVERY_WAITING_FOR_PAYMENT_ANTCAR
  | typeof STATUS_LOCAL_DELIVERY_DEADLINE_AWAITING_USER_PAYMENT
  | typeof STATUS_LOCAL_DELIVERY_STOP
  | typeof STATUS_LOCAL_DELIVERY_USER_PAYMENT_SUCCESS
  | typeof STATUS_LOCAL_DELIVERY_PAYMENT_ANTCAR_ERROR
  | typeof STATUS_LOCAL_DELIVERY_PAYMENT_ANTCAR_SUCCESS
  | typeof STATUS_LOCAL_DELIVERY_NOT_DELIVERY
  | typeof STATUS_LOCAL_DELIVERY_SUCCESS

export type StepType =
  | typeof STEP_TYPE_BOOKING
  | typeof STEP_TYPE_PAYMENT
  | typeof STEP_TYPE_INTERNATIONAL_SHIPPING
  | typeof STEP_CUSTOMS_CLEARANCE
  | typeof STEP_LOCAL_DELIVERY
export interface OrderCars extends BaseEntity {
  orders: OrderCar[]
}
export interface OrderCar extends BaseEntity {
  currentStep: Step & { currentStatus: Status; type: StepType }
  car: ProfileCar
}
export interface Step extends BaseEntity {
  currentStatus?: BaseEntity & { status: PaymentStatus }
  type?: StepType
}
export interface Status extends BaseEntity {
  status: PaymentStatus
  type: number
}
export interface Order extends BaseEntity {
  user: User | string
  startDate: string
  endDate: string
  car: BaseEntity
  steps: Step[]
  currentStep: BaseEntity
  status: PaymentStatus
  payments: (Payment | string)[]
  pay: boolean
}
export interface Payment extends BaseEntity {
  user: string
  order: string
  step: Step
  total: 0
  currency: string
  totalRub: 0
  exchangeRate: 0
  date: string
  externalId: string
  errorMessage: string
  paymentURL: string
}

export interface Documents extends BaseEntity {
  name: string
  file: Pick<FileModel, 'pathS3' | 'id'>
}

export interface PaymentInstruction extends BaseEntity {
  version: string
  file: Pick<FileModel, 'pathS3' | 'id'>
}
