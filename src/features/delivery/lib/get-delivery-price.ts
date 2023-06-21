import { Delivery } from './types'

export const getDeliveryPrice = (delivery?: Delivery) =>
  delivery?.delivery ? Object.values(delivery.delivery).reduce((acc, value) => acc + value) : 0
