import { ForwardedRef, forwardRef, Ref, useState } from 'react'
import RcSelect, { BaseSelectRef, Option, SelectProps as RcSelectProps } from 'rc-select'
import { Nullable, PropsWithClassName, SelectOption } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import Loading from '@/shared/assets/icons/common/loading.svg'
import ArrowIcon from '@/shared/assets/icons/common/select-arrow.svg'
import SelectClose from '@/shared/assets/icons/common/select-close.svg'
import cn from 'classnames'

export interface SelectSearchProps<T> extends Omit<RcSelectProps, 'value' | 'onChange' | 'onSelect'> {
  open?: boolean
  searchedValue?: string
  name: string
  label?: string
  value?: Nullable<T>
  options?: SelectOption[]
  inputProps?: Omit<InputProps, 'name'>
  isLoading?: boolean
  emptyRequestText?: string
  onChange?: (selected: Nullable<T>) => void
}

const SelectSearchComponent = <T extends Nullable<string | number>>(
  {
    open,
    searchedValue = '',
    name,
    label,
    value,
    defaultValue,
    options,
    inputProps,
    isLoading,
    emptyRequestText,
    onChange,
    onSearch,
    ...rest
  }: SelectSearchProps<PropsWithClassName<T>>,
  ref: Ref<BaseSelectRef>
) => {
  const { t } = useTranslate(['common'])
  const [isOpen, setIsOpen] = useState(open)
  const [searchValue, setSearchValue] = useState(searchedValue)
  const inputValue = options?.find(option => option.id === value)?.label || searchValue

  return (
    <RcSelect
      ref={ref}
      mode='combobox'
      value={inputValue as T}
      searchValue={searchValue}
      getInputElement={() => (
        <Input
          {...inputProps}
          name={name}
          label={label}
          placeholder={t('search')}
          type='search'
          className='w-full'
          open={isOpen}
          suffixIcon={
            <div className='flex items-center gap-[9px] h-full'>
              {inputValue && (
                <Button
                  variant='icon'
                  data-testid='close-button-select-search'
                  disabled={rest.disabled}
                  className='h-full'
                  onClick={e => [e.stopPropagation(), setIsOpen(false), onChange?.(null), setSearchValue('')]}
                >
                  <SelectClose />
                </Button>
              )}
              {inputProps?.suffixIcon || (
                <Button
                  data-testid='suffix-icon-select-search'
                  variant='icon'
                  className='h-full'
                  disabled={rest.disabled}
                  onMouseDown={() => setIsOpen(prev => !prev)}
                >
                  <ArrowIcon
                    className={cn('stroke-black', {
                      'stroke-border': rest.disabled,
                      '-rotate-180': isOpen,
                    })}
                  />
                </Button>
              )}
            </div>
          }
        />
      )}
      open={isOpen}
      onChange={onChange}
      onSearch={value => [onSearch?.(value), setSearchValue(value)]}
      onDropdownVisibleChange={setIsOpen}
      {...rest}
    >
      {isLoading ? (
        <span className='pointer-events-none rc-select-item-option justify-center'>
          <Loading data-testid='select-preloader' className='select-preloader' />
        </span>
      ) : options?.length ? (
        options.map(
          option =>
            option.label && (
              <Option
                key={option.id}
                value={option.id}
                label={option.label}
                data-testid='rc-select-item-option'
                className={cn({ 'rc-select-item-option-active': option.id === value })}
              >
                <h4>{option.label}</h4>
              </Option>
            )
        )
      ) : (
        <span className='container-empty-dropdown border-none'>{emptyRequestText || t('emptyRequest')}</span>
      )}
    </RcSelect>
  )
}

export const SelectSearch = forwardRef(SelectSearchComponent) as <T>(
  props: SelectSearchProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SelectSearchComponent>
