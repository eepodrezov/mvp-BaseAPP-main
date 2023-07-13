import cn from 'classnames'
import { FCWithClassName, FileModel } from '@/shared/@types'
import { NextImage } from '@/shared/ui'
import { Slider } from '@/shared/ui/slider'
import { PhotoPlug } from '@/shared/ui'
import { useModalState, useWindowDimensions } from '@/shared/hooks'
import { carSliderModalAtom } from '@/entities/car'
import { useState } from 'react'
import { getCarImage } from '@/entities/car/lib/get-car-image'

export interface CarPageImagesBlockProps {
  images?: FileModel[]
  currentImageIndex: number
  setCurrentImageIndex?: (index: number) => void
}

export const CarPageImagesBlock: FCWithClassName<CarPageImagesBlockProps> = ({
  className,
  images,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const { onOpen: onOpenSlideModal } = useModalState(carSliderModalAtom)
  const [slideLoading, setSlideLoading] = useState(true)

  const onImageClick = (index: number) => {
    setCurrentImageIndex?.(index), setSlideLoading(true)
  }

  const { isTablet } = useWindowDimensions()

  if (!images || !images.length) {
    return <PhotoPlug height={652} width={870} className={className} />
  }

  return (
    <div className={cn('flex flex-col gap-small', className)}>
      {images && (
        <NextImage
          variant='red'
          setSlideLoading={setSlideLoading}
          slideLoading={slideLoading}
          onClick={onOpenSlideModal}
          className='rounded-large cursor-pointer'
          width={isTablet ? 670 : 870}
          height={652}
          src={getCarImage('big', images[currentImageIndex])}
        />
      )}
      {images?.length > 1 && (
        <div style={{ width: isTablet ? '670px' : '870px' }}>
          <Slider
            initialSlide={currentImageIndex}
            onImageClick={onImageClick}
            images={images}
            allowTouchMove={false}
            slideWidth={210}
            slideHeight={157}
            slideBorderRadius={20}
            spaceBetween={10}
            shownImagesCount={isTablet ? 3 : 4}
          />
        </div>
      )}
    </div>
  )
}
