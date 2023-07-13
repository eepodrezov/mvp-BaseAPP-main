import { FC } from 'react'
import SliderArrow from '@/shared/assets/icons/common/slider-arrow.svg'
import { useSwiper } from 'swiper/react'
import cn from 'classnames'
interface SlideButtonProps {
  type: 'left' | 'right'
  isModal?: boolean
}

export const SlideButton: FC<SlideButtonProps> = ({ type, isModal }) => {
  const swiper = useSwiper()
  return (
    <button
      className={cn(
        'z-10 w-10 absolute flex justify-center items-center x-3 bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.6)] active:bg-black backdrop-blur-[4.5px]',
        {
          'left-0 rounded-l-large': type === 'left',
          'right-0 rounded-r-large': type === 'right',
          'hidden  tablet:flex h-[150px] !rounded-base': isModal,
          'h-full top-0': !isModal,
        }
      )}
      onClick={() => (type === 'left' ? swiper.slidePrev() : swiper.slideNext())}
    >
      <SliderArrow className={cn('fill-white', { 'rotate-180': type === 'left' })} />
    </button>
  )
}
