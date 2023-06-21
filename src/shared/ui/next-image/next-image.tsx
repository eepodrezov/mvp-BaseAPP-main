import Image, { ImageProps } from 'next/image'
import { FC, useState } from 'react'
import { PhotoPlug } from '../photo-plug'
import CarPlugIcon from '@/shared/assets/icons/common/car-empty-plug.svg'
export interface NextImageProps extends Omit<ImageProps, 'src'> {
  src?: string
  photoPlugCar?: boolean
}

// TODO: deviceSizes, когда будут breakpoint

// ВАЖНО, если не прокидываете width, height, то вы должны делать родителя position: relative, fixed, absolute
export const NextImage: FC<NextImageProps> = ({ src, width, height, className, photoPlugCar, onError, ...rest }) => {
  const [error, setError] = useState(false)

  if (!src || error) {
    if (photoPlugCar) return <CarPlugIcon width={64} height={64} />
    return <PhotoPlug width={width} height={height} />
  }

  return (
    <Image
      src={src}
      className={className}
      {...(width && height ? { width, height } : { layout: 'fill' })}
      quality={100}
      {...rest}
      onError={event => {
        setError(true)
        onError?.(event)
      }}
    />
  )
}
