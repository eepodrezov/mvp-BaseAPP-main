import { FCWithClassName } from '@/shared/@types'
import { Dish } from '@/entities/dish'

export interface RecipeSlider {
  recipes: Dish[]
}

export const RecipeSlider:FCWithClassName<RecipeSlider> = ({ 
  recipes
 }) => {

  return (
    <div className='overflow-auto pt-[-5px] snap-mandatory'>
      {recipes.map(recipes => (
        <div key={recipes.name + recipes.country} className='relative w-screen h-screen'>
          <img className='w-full h-full' src={recipes.image} alt=""/> 
          <div className='absolute bottom-[65px] bg-black/75 text-white flex p-5 gap-2 flex-col'>
            <h1>{recipes.name}</h1>
            <h2>{recipes.country}</h2>
            <h2>{recipes.description}</h2>
          </div> 
        </div>
      ))}
    </div>
  )
}
