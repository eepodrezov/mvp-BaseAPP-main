import { useState } from 'react'
import { Card } from '@/entities/dish/ui'
import pasta from '@/shared/assets/images/1.jpg'
import lazania from '@/shared/assets/images/2.jpg'
import sharlotka from '@/shared/assets/images/3.jpg'
import Catalog from '@/shared/assets/icons/catalog.svg'
import Slider from '@/shared/assets/icons/slider.svg'
import cn from 'classnames'
import { RecipeSlider } from '@/widgets/recipe-slider'
import { Button } from '@/shared/ui' 
import { Dish } from '@/entities/dish'

export const RecipesView = () => {
  const [isCatalog,setIsCatalog] = useState(false)
  return (
    <div
      className={cn('grid gap-small main:grid-cols-2 main:gap-large w-full h-fit', {
      })}
    >
      <Button className='!fixed top-2 left-2 z-50 p-1 rounded-xl bg-white' variant='icon' onClick={() => setIsCatalog(prev => !prev)}>{isCatalog ? <Catalog className='w-[50px] h-[50px]'/> : <Slider className='w-[50px] h-[50px]'/>}</Button>
      {
        isCatalog ? recipesMock.map((recipe,i) => (
          <Card key={i} recipe={recipe}/>
        ))
      :
        <RecipeSlider recipes={recipesMock}/>
      }
    </div>
  )
}


const recipesMock = [
  {
    name: 'Спагетти карбонара со сливками',
    description: 'Спагетти карбонара — хоть блюдо и итальянское, оно имеет хорошую популярность во всем мире, в том числе и у нас.',
    image: pasta.src,
    images: [pasta.src],
    country: 'Россия',
  },
  {
    name: 'Лазанья со свининой и грибами',
    description: 'Макаронное изделие, тонкий лист теста в форме квадрата или прямоугольника, а также блюдо итальянской кухни, традиционно приготовляемое из тонких листов теста со слоями различной начинки. ',
    image: lazania.src,
    images: [lazania.src],
    country: 'Россия',
  },
  {
    name: 'Классическая шарлотка',
    description: 'Классическая шарлотка. Важное сладкое блюдо советской и постсоветской истории.',
    image: sharlotka.src,
    images: [sharlotka.src],
    country: 'Россия',
  },
] as Dish[]
