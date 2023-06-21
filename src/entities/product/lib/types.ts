
export interface Product {
  name: string
  price: Price
  description: string
  image: string
  images: string[]
  country: string
  brand: string
}

export type Price = {
  value: number
  currency: string
}
