import { FCWithChildren } from '@/shared/@types'
import { Button } from '@/shared/ui'
import HeaderArrowIcon from '@/shared/assets/icons/common/header-arrow.svg'
import router from 'next/router'
import cn from 'classnames'

export interface InfoPageContentLayoutProps {
  title: string
}

export const InfoPageContentLayout: FCWithChildren<InfoPageContentLayoutProps> = ({ children, title, className }) => (
  <div className='flex flex-col items-center justify-center max-w-screen-main w-full min-h-mobile-content min-[1280px]:min-h-content mx-auto mb-5 min-[1280px]:mb-10'>
    <div className='w-full flex items-center justify-between h-20 px-5 border-b border-black min-[1280px]:hidden'>
      <Button variant='icon' onClick={router.back}>
        <HeaderArrowIcon className='fill-black' />
      </Button>
      <h1 className='text-black croogla-text w-full flex justify-center '>{title}</h1>
    </div>
    <h1 className='hidden text-black min-[1280px]:block croogla-title mb-5 mt-10'>{title}</h1>
    <div
      className={cn(
        'w-full flex justify-center items-center flex-col gap-5 rounded-large max-w-[830px] p-5 min-[1280px]:p-10 min-[1280px]:shadow-panel min-[1280px]:source-text source-mobile-text !leading-[180%]',
        className
      )}
    >
      {children}
    </div>
  </div>
)
