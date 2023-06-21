import React from 'react'
import { Card } from '@/entities/product/ui'
import { Product } from '@/entities/product'
import defaultProduct from '@/shared/assets/images/product.jpeg'
import cn from 'classnames'



export const CatalogView = () => {
  return (
    <div
      className={cn('grid gap-small main:grid-cols-2 main:gap-large w-full h-fit', {
      })}
    >
        {Array.from({ length: 20 }).map((_,i) => (
          <Card key={i} product={catalogCardsMock}/>
          ))}
    </div>
  )
}

const catalogCardsMock = {
  name: 'Молоко',
  price: {
    value: 299,
    currency: 'Р',
  },
  description: 'Очень вкусно молоко',
  image: defaultProduct.src,
  images: [defaultProduct.src,defaultProduct.src,defaultProduct.src],
  country: 'Россия',
  brand: 'Фанагория'
} as Product

