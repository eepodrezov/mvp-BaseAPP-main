import { ReactElement } from 'react'
import cn from 'classnames'
import { FCWithChildren } from '@/shared/@types'
import WarningIcon from '@/shared/assets/icons/common/warning-icon.svg'
import InfoIcon from '@/shared/assets/icons/common/info.svg'

export interface InformerProps {
  icon?: ReactElement
  type?: 'warning' | 'info'
  textClassName?: string
}

export const Informer: FCWithChildren<InformerProps> = ({
  icon,
  type = 'warning',
  children,
  textClassName,
  className,
}) => {
  const Icon = type === 'warning' ? WarningIcon : InfoIcon
  return (
    <div
      className={cn(
        'bg-gray rounded-xl source-secondary-title max-w-[460px] flex py-2.5 gap-3 font-normal px-3 text-text justify-center desktop:items-start w-full',
        className
      )}
    >
      {icon || (
        <Icon
          className={cn({
            'stroke-red': type === 'warning',
            'stroke-green': type === 'info',
          })}
        />
      )}
      <p
        className={cn(
          'w-[calc(100%-36px)] text-start',
          {
            'min-[1280px]:text-lg text-base leading-[160%] min-[1280px]:leading-[180%]': type === 'info',
          },
          textClassName
        )}
      >
        {children}
      </p>
    </div>
  )
}
