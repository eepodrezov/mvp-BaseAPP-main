import { ReactElement } from 'react'
import cn from 'classnames'
import { FCWithChildren } from '@/shared/@types'
import WarningIcon from '@/shared/assets/icons/common/warning-icon.svg'

export interface InformerProps {
  icon?: ReactElement
}

export const Informer: FCWithChildren<InformerProps> = ({ icon, children, className }) => {
  return (
    <div
      className={cn(
        'source-secondary-title max-w-[460px] flex py-2.5 gap-3 font-normal px-3 text-text justify-center desktop:items-start w-full',
        className
      )}
    >
      {icon || <WarningIcon className='stroke-red' />}
      <p className='w-[calc(100%-36px)] text-start'>{children}</p>
    </div>
  )
}
