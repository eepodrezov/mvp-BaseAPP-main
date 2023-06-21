import { FC } from 'react'
import { Swiper, SwiperSlide, SwiperProps, useSwiper } from 'swiper/react'
import { FCWithClassName, FileModel } from '@/shared/@types'
import 'swiper/css'
import { NextImage } from '../next-image'
import { A11y, Keyboard } from 'swiper'
import { PhotoPlug } from '../photo-plug'
import SliderArrow from '@/shared/assets/icons/common/slider-arrow.svg'
import cn from 'classnames'

export interface SliderProps extends SwiperProps {
  images?: FileModel[]
  slideWidth: number
  slideHeight: number
  slideBorderRadius: number
  shownImagesCount?: number
  currentImageIndex?: number
  onImageClick?: (index: number) => void
}

export const Slider: FCWithClassName<SliderProps> = ({
  images = [],
  slideWidth,
  slideHeight,
  slideBorderRadius,
  onImageClick,
  currentImageIndex,
  shownImagesCount,
  className,
  ...rest
}) => {
  if (!images || !images.length) {
    return <PhotoPlug height={slideHeight} className={className} />
  }
  const isButtonsVisible = shownImagesCount && images.length > shownImagesCount

  return (
    <Swiper
      className='relative rounded-large'
      modules={[A11y, Keyboard]}
      touchMoveStopPropagation
      allowTouchMove={false}
      slidesPerView='auto'
      {...rest}
    >
      {isButtonsVisible && <SlideButton type='left' />}
      {images.map((image, index) => (
        <SwiperSlide
          className={cn('cursor-pointer overflow-hidden', { 'border-2 border-black': currentImageIndex === index })}
          key={image.id}
          style={{ width: slideWidth, height: slideHeight, borderRadius: slideBorderRadius }}
        >
          <NextImage src={image.pathS3} onClick={() => onImageClick?.(index)} />
        </SwiperSlide>
      ))}
      {isButtonsVisible && <SlideButton type='right' />}
    </Swiper>
  )
}

interface SlideButtonProps {
  type: 'left' | 'right'
}

const SlideButton: FC<SlideButtonProps> = ({ type }) => {
  const swiper = useSwiper()
  return (
    <button
      className={cn(
        'z-10 absolute top-0 px-3 h-full bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.6)] active:bg-black backdrop-blur-[4.5px]',
        {
          'left-0 rounded-l-large': type === 'left',
          'right-0 rounded-r-large': type === 'right',
        }
      )}
      onClick={() => (type === 'left' ? swiper.slidePrev() : swiper.slideNext())}
    >
      <SliderArrow className={cn('fill-white', { 'rotate-180': type === 'left' })} />
    </button>
  )
}
