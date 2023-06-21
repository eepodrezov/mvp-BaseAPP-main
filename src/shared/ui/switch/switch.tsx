import { FC, ReactElement, MouseEvent } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { ControllerRenderProps, RefCallBack } from 'react-hook-form'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'

export interface SwitchProps extends Omit<ControllerRenderProps, 'onBlur' | 'ref'> {
  label?: string | ReactElement
  disabled?: boolean
  wrapperClassName?: string
  labelClassName?: string
  loading?: boolean
  isRedSwitch?: boolean
  ref?: RefCallBack
  onBlur?: () => void
}

export const Switch: FC<SwitchProps> = ({
  name,
  value,
  label,
  wrapperClassName,
  loading,
  isRedSwitch,
  labelClassName,
  ...rest
}) => {
  return (
    <HeadlessSwitch.Group
      data-testid='switch-wrapper'
      as='div'
      className={cn('flex items-center gap-2 max-h-[23px]', wrapperClassName)}
      // @ts-expect-error Если юзать в контейнере,который обернут линкой, то при клике на label, будет перекидывать на другую страницу
      onClick={(e: MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()}
    >
      {label && (
        <HeadlessSwitch.Label
          className={cn('source-text cursor-pointer w-full', labelClassName, { 'cursor-not-allowed': rest.disabled })}
        >
          {loading ? <Skeleton className='!w-[100px] h-full' /> : label}
        </HeadlessSwitch.Label>
      )}
      {loading ? (
        <Skeleton className='!w-10 h-full' />
      ) : (
        <HeadlessSwitch
          {...rest}
          id={name}
          name={name}
          checked={value}
          className={cn(
            'relative inline-flex items-center w-10 group h-small bg-border rounded-xl disabled:bg-gray disabled:cursor-not-allowed',
            { 'h-[14px]': isRedSwitch, '!bg-red/50': isRedSwitch && value }
          )}
        >
          {({ checked }) => (
            <span
              aria-hidden='true'
              className={cn(
                'w-5 h-5 bg-black rounded-full inline-block transition-all border border-black group-disabled:bg-border group-disabled:border-border',
                {
                  'translate-x-5 !bg-white': checked,
                  'border-none shadow-switch': isRedSwitch,
                  '!bg-white': !checked && isRedSwitch,
                  '!bg-red': isRedSwitch && checked,
                }
              )}
            />
          )}
        </HeadlessSwitch>
      )}
    </HeadlessSwitch.Group>
  )
}
