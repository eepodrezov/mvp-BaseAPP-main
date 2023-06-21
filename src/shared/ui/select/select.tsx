import { ForwardedRef, forwardRef, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Arrow from '@/shared/assets/icons/common/select-arrow.svg'
import Loading from '@/shared/assets/icons/common/loading.svg'
import cn from 'classnames'
import { Nullable, SelectOption } from '@/shared/@types'
import { Input, InputProps } from '@/shared/ui'
import SelectClose from '@/shared/assets/icons/common/select-close.svg'
import { Button } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import { SetStateAction } from 'jotai'
import { useFloating, useInteractions, flip, useDismiss, autoUpdate } from '@floating-ui/react-dom-interactions'

export interface SelectProps<T> {
  name: string
  label?: string
  value?: Nullable<T>
  defaultValue?: Nullable<T>
  disabled?: boolean
  options?: SelectOption[]
  emptyRequestText?: string
  suffixIcon?: ReactNode
  inputProps?: Omit<InputProps, 'name'>
  className?: string
  isLoading?: boolean
  onChange?: (selected: Nullable<T>) => void
  withClearButton?: boolean
  showSearch?: boolean
  prefix?: string
  selectInputClassName?: string
  hidden?: boolean
  notSelected?: string
  onSearch?: (value: SetStateAction<string>) => void
}

const SelectComponent = <T extends string | number>(
  {
    name,
    showSearch,
    prefix = '',
    value,
    label,
    options,
    className = '',
    selectInputClassName = '',
    hidden,
    isLoading,
    notSelected = 'notSelected',
    onChange,
    onSearch,
    inputProps,
    defaultValue,
    suffixIcon,
    emptyRequestText,
    disabled,
    withClearButton = true,
    ...rest
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { t } = useTranslate(['common'])
  const inputValue = options?.find((option: SelectOption) => option.id === value)?.label
  const { reference, floating, context, strategy, y } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({
        padding: {
          bottom: 90,
        },
      }),
    ],
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)])

  return (
    <Listbox
      as='div'
      className={cn('relative w-full outline-none', className)}
      value={value}
      disabled={disabled}
      onChange={e => onChange?.(e)}
      {...(defaultValue && { defaultValue })}
    >
      {({ open }) => (
        <>
          <Listbox.Button {...getReferenceProps({ ref: reference })} className='w-full'>
            <Input
              ref={ref}
              name={name}
              label={label}
              placeholder={label}
              type='select'
              readOnly
              value={inputValue || ''}
              disabled={disabled}
              open={open}
              suffixIcon={
                <div className='flex items-center gap-[9px]'>
                  {inputValue && !disabled && withClearButton && (
                    <Button variant='icon' data-testid='select-close-icon' onClick={() => onChange?.(null)}>
                      <SelectClose />
                    </Button>
                  )}
                  {suffixIcon || (
                    <Button variant='icon'>
                      <Arrow
                        className={cn('stroke-black', {
                          'stroke-border': disabled,
                          '-rotate-180': open,
                        })}
                      />
                    </Button>
                  )}
                </div>
              }
              {...inputProps}
            />
          </Listbox.Button>
          <Transition
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
              },
            })}
            show={open}
            enterFrom='scale-y-95 opacity-0'
            enterTo='scale-y-100 opacity-100'
            leaveFrom='scale-y-100 opacity-100'
            leaveTo='scale-y-95 opacity-0'
            data-testid='select-options-wrapper'
            className={cn('z-10 w-full overflow-hidden shadow-button mt-extra-small', {
              'rc-select-dropdown': options?.length,
              'container-empty-dropdown': !options?.length,
            })}
          >
            {isLoading ? (
              <div className='pointer-events-none rc-select-item-option justify-center'>
                <Loading data-testid='select-preloader' className='select-preloader' />
              </div>
            ) : options?.length ? (
              <Listbox.Options static className='rc-virtual-list-holder scrollbar-dropdown'>
                {(options as SelectOption[])?.map(
                  ({ id, label }) =>
                    label && (
                      <Listbox.Option data-testid='select-option' key={id} value={id}>
                        {({ active, selected }) => (
                          <div
                            className={cn('rc-select-item-option', {
                              'rc-select-item-option-active': active || selected,
                            })}
                          >
                            {label}
                          </div>
                        )}
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            ) : (
              emptyRequestText || t('emptyRequest')
            )}
          </Transition>
        </>
      )}
    </Listbox>
  )
}

export const Select = forwardRef(SelectComponent) as <T>(
  props: SelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SelectComponent>
