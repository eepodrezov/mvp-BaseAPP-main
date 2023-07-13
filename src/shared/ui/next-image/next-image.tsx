import { ImageProps } from 'next/image'
import { FC, useState, useRef, useEffect } from 'react'
import { PhotoPlug } from '../photo-plug'
import CarPlugIcon from '@/shared/assets/icons/common/car-empty-plug.svg'
import cn from 'classnames'
import Loading from '@/shared/assets/icons/common/loading.svg'

type Variant = 'red' | 'gray'
export interface NextImageProps extends Omit<ImageProps, 'src'> {
  src?: string
  photoPlugCar?: boolean
  slideLoading?: boolean
  setSlideLoading?: (value: boolean) => void
  variant?: Variant
  wrapperClassname?: string
}

// TODO: deviceSizes, когда будут breakpoint

// ВАЖНО, если не прокидываете width, height, то вы должны делать родителя position: relative, fixed, absolute
export const NextImage: FC<NextImageProps> = ({
  src,
  width,
  height,
  className,
  wrapperClassname,
  photoPlugCar,
  onError,
  slideLoading,
  setSlideLoading,
  variant = 'gray',
  ...rest
}) => {
  const [blur, setBlur] = useState(true)
  const loadingImage = useRef()

  useEffect(() => {
    // @ts-expect-error
    if (loadingImage && loadingImage?.current?.complete) {
      setBlur(false)
      setSlideLoading && setSlideLoading(false)
    }
    loadingImage &&
      // @ts-expect-error
      loadingImage?.current?.addEventListener('load', () => {
        setBlur(false)
        setSlideLoading && setSlideLoading(false)
      })
  }, [loadingImage])

  if (!src) {
    if (photoPlugCar) return <CarPlugIcon width={64} height={64} />
    return <PhotoPlug width={width} height={height} />
  }

  console.log('image', src)

  return (
    <div className={cn('w-full h-full relative', wrapperClassname)}>
      {(blur || slideLoading) && (
        <div className='absolute w-full h-full flex justify-center items-center'>
          <Loading
            className={cn('animate-spin w-10 h-10 group-disabled:fill-border z-10', {
              'fill-red': variant === 'red',
              'fill-text': variant === 'gray',
            })}
          />
        </div>
      )}
      {/* <Image
        onLoadingComplete={() => [setIsLoading(false), setSlideLoading?.(false)]}
        src={src}
        className={cn(className, { 'blur-lg': isLoading || slideLoading })}
        {...(width && height ? { width, height } : { layout: 'fill' })}
        quality={100}
        {...rest}
        onError={event => {
          setError(true)
          onError?.(event)
        }}
      /> */}
      <img
        src={src}
        className={cn(className, { 'blur-lg': blur || slideLoading })}
        // {...(width && height ? { width, height } : { layout: 'fill' })}
        alt='car-image'
        style={width && height ? { width: width, height: height } : {}}
        {...rest}
        loading='lazy'
        // @ts-expect-error
        ref={loadingImage}
      />
    </div>
  )
}
