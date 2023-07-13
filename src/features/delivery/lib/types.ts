import { BaseEntity } from '@/shared/@types'

export interface Delivery extends BaseEntity {
  carPrice: number
  customClearance: {
    customClearanceFee: number
    recyclingFee: number
    exciseTax: number
    customDuty: number
    fullClearancePrice?: number
  }
  delivery: {
    internationalDelivery: number
    domesticDelivery: number
  }
  fullPrice: number
  bookingPrice: number
}
