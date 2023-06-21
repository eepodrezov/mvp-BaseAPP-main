import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { FCWithClassName } from '@/shared/@types'
import 'swiper/css'
import { NextImage } from '../next-image'
import { A11y, Keyboard } from 'swiper'
import { PhotoPlug } from '../photo-plug'
import cn from 'classnames'

export interface CarouselProps extends SwiperProps {
  images?: string[]
  slideWidth: number
  slideHeight: number
  slideBorderRadius: number
}

export const Carousel: FCWithClassName<CarouselProps> = ({
  images = [],
  slideWidth,
  slideHeight,
  slideBorderRadius,
  className,
  ...rest
}) => {
  // TODO добавил проверку временно, чтобы отрабатывало на иришки
  if (!images || !images.length || !images?.[0]) {
    return <PhotoPlug height={slideHeight} className={className} />
  }

  return (
    <Swiper
      className={cn('cursor-pointer', className)}
      modules={[A11y, Keyboard]}
      grabCursor
      loop
      freeMode
      slidesPerView='auto'
      {...rest}
    >
      {images.map(image => (
        <SwiperSlide key={image} style={{ width: slideWidth, height: slideHeight }}>
          <NextImage src={image} style={{ borderRadius: slideBorderRadius }} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
