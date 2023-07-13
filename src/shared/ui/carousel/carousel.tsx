import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { FCWithClassName, FileModel } from '@/shared/@types'
import 'swiper/css'
import { NextImage } from '../next-image'
import { A11y, Keyboard } from 'swiper'
import { PhotoPlug } from '../photo-plug'
import cn from 'classnames'
import { getCarImage, checkIsAnyPhoto } from '@/entities/car/lib/get-car-image'

export interface CarouselProps extends SwiperProps {
  images?: FileModel[]
  slideWidth: number
  slideHeight: number
  slideBorderRadius: number
  onSlideClick?: (index: number) => void
}

export const Carousel: FCWithClassName<CarouselProps> = ({
  images = [],
  slideWidth,
  slideHeight,
  slideBorderRadius,
  onSlideClick,
  className,
  ...rest
}) => {
  // TODO добавил проверку временно, чтобы отрабатывало на иришки
  if (!images || !images.length || !checkIsAnyPhoto(images?.[0])) {
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
      {images.map((image, index) => (
        <SwiperSlide key={image.id} style={{ width: slideWidth, height: slideHeight }}>
          <NextImage
            onClick={() => onSlideClick?.(index)}
            src={getCarImage('small', image)}
            style={{ borderRadius: slideBorderRadius }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
