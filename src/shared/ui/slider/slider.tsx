import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { FCWithClassName, FileModel } from '@/shared/@types'
import 'swiper/css'
import { NextImage } from '../next-image'
import { A11y, Keyboard, Pagination } from 'swiper'
import { PhotoPlug } from '../photo-plug'
import cn from 'classnames'
import { SlideButton } from './slide-button'
import 'swiper/css/pagination'
import { getCarImage } from '@/entities/car/lib/get-car-image'

export interface SliderProps extends SwiperProps {
  images?: FileModel[]
  isModal?: boolean
  slideWidth?: number | string
  slideHeight?: number
  aspectRatio?: string
  slideBorderRadius?: number
  shownImagesCount?: number
  withRedLoader?: boolean
  onImageClick?: (index: number) => void
}

export const Slider: FCWithClassName<SliderProps> = ({
  images = [],
  isModal,
  slideWidth,
  slideHeight,
  aspectRatio,
  slideBorderRadius,
  onImageClick,
  shownImagesCount,
  withRedLoader,
  className,
  ...rest
}) => {
  if (!images || !images.length) {
    return <PhotoPlug height={slideHeight} className={className} />
  }
  const isButtonsVisible = shownImagesCount && images.length > shownImagesCount

  return (
    <Swiper
      className='flex items-end tablet:items-center w-full h-full'
      modules={[A11y, Keyboard, Pagination]}
      touchMoveStopPropagation
      slidesPerView={isModal ? 1 : 'auto'}
      {...rest}
    >
      {isButtonsVisible && <SlideButton isModal={isModal} type='left' />}
      <div className='flex'>
        {images.map((image, index) => (
          <SwiperSlide
            className={cn('cursor-pointer overflow-hidden', {
              'border-2 border-black': !isModal && rest.initialSlide === index,
              'cursor-grab active:cursor-grabbing': isModal,
            })}
            key={image.id}
            style={{
              width: slideWidth,
              height: slideHeight,
              borderRadius: slideBorderRadius,
              aspectRatio: aspectRatio,
            }}
          >
            <NextImage
              {...(withRedLoader && { variant: 'red' })}
              layout='fill'
              objectFit={isModal ? 'contain' : 'cover'}
              src={getCarImage(isModal ? 'origin' : 'small', image)}
              onClick={() => onImageClick?.(index)}
              wrapperClassname='flex justify-center items-center'
            />
          </SwiperSlide>
        ))}
      </div>
      {isButtonsVisible && <SlideButton isModal={isModal} type='right' />}
    </Swiper>
  )
}
