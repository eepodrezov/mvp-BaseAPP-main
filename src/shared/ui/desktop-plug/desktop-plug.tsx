import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'
import InDevelopmentPlugIcon from '@/shared/assets/icons/common/in-development-plug.svg'

export interface DesktopPlugProps {
  width?: string | number
  height?: string | number
}

export const DesktopPlug: FCWithClassName<DesktopPlugProps> = ({ width, height, className }) => {
  return (
    <div
      data-testid='image-no-photo'
      className={cn('flex items-center justify-center croogla-text text-text rounded-large', className)}
      // Из-за JIT компилятора не получится всунуть в cn через tailwind
      style={{ width: width || '100%', height: height || '100vh' }}
    >
      <p className='w-[276px] flex flex-col gap-5 items-center'>
        <InDevelopmentPlugIcon className='mb-small stroke-black' />
        <div className='croogla-title text-black text-center'>Только мобильная версия</div>
        <div className='source-text text-center'>{'Переведите браузер в мобильное разрешение(<768px в ширину)'}</div>
      </p>
    </div>
  )
}

