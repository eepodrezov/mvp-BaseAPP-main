import { ReactNode, useState } from 'react'
import { SwiperProps } from 'swiper/react'
import { FCWithChildren } from '@/shared/@types'
import 'swiper/css'
import { Button } from '../button'
import SliderArrow from '@/shared/assets/icons/common/slider-arrow.svg'


export interface ContentSliderProps extends SwiperProps {
  className?: string
}

export const ContentSlider: FCWithChildren<ContentSliderProps> = ({
  children,
  className,
  ...rest
}) => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0)
  if (!children || !(children as ReactNode[]).length) {
    return <div>No content</div>
  }

  function prev() {
    if (currentComponentIndex === 0) {
      return setCurrentComponentIndex((children as ReactNode[]).length - 1)
    }
    return setCurrentComponentIndex(prev => prev - 1)
  }

  function next() {
    if (currentComponentIndex + 1 === (children as ReactNode[]).length) {
      return setCurrentComponentIndex(0)
    }
    return setCurrentComponentIndex(prev => prev + 1)
  }

  return (
    <div className='pb-5 h-full flex flex-col items-center justify-end'>
      <div
        className='h-full flex justify-center items-center'
      >
        {(children as ReactNode[])[currentComponentIndex]}
      </div>
      <div className='flex gap-16'>
        <Button variant='icon' onClick={() => prev()}>
          <SliderArrow className='fill-black w-3 h-5 group-disabled:fill-border rotate-180' />
        </Button>
        <Button variant='icon' onClick={() => next()}>
          <SliderArrow className='fill-black w-3 h-5 group-disabled:fill-border' />
        </Button>
      </div>
    </div>
  )
}



