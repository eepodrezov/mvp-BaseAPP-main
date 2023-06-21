import { TFunction } from '@/shared/@types'
import { ORDER_STEP_TEXT, ORDER_STATUS_TEXT } from './constants'
import { PaymentStatus, StepType } from './types'

export const getOrderStatus = (t: TFunction, status?: PaymentStatus) => status && t(ORDER_STATUS_TEXT[status])

export const getOrderStep = (step: StepType, t: TFunction) => t(ORDER_STEP_TEXT[step])
