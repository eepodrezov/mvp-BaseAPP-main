import { FC } from 'react'
import { Button, ButtonProps } from '../button'
import cn from 'classnames'
import { Tooltip } from '../tooltip'

export interface ButtonMobileFixedWrapperProps extends ButtonProps {
  wrapperClassName?: string
  label?: string
}

export const ButtonMobileFixedWrapper: FC<ButtonMobileFixedWrapperProps> = ({
  wrapperClassName,
  className,
  children,
  label,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-full py-4 px-5 z-10 bg-white shadow-mobile-button desktop:hidden',
        wrapperClassName
      )}
    >
      <Tooltip className='flex items-center' isActive={rest.disabled || false} label={label || ''}>
        <Button className={cn('w-full', className)} {...rest}>
          {children}
        </Button>
      </Tooltip>
    </div>
  )
}
