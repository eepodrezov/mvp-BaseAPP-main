import { forwardRef, useState, FocusEvent, ForwardedRef, FC, useEffect } from 'react'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import PhoneInput from 'react-phone-input-2'
import { Button } from '../button'
import { getTrimmedString } from '@/shared/helpers'
import { InputType, InputProps, onChangeInput, onChangePhoneInput, ExtendsReturnType, SuffixIconProps } from './lib'
import { MEDIUM_PASSWORD_REG_EXP, STRONG_PASSWORD_REG_EXP, WEAK_PASSWORD_REG_EXP } from '@/shared/config'
import { TFunction } from '@/shared/@types'
import SearchSVG from '@/shared/assets/icons/common/search.svg'
import CloseEye from '@/shared/assets/icons/common/close-eye.svg'
import OpenEye from '@/shared/assets/icons/common/open-eye.svg'

export const InputComponent = <T extends InputType>(
  {
    name,
    label,
    error,
    errorMessage,
    className = '',
    type = 'text',
    passwordStrength,
    withoutLabel,
    suffixIcon,
    prefixNode,
    inputClassName,
    classNameContainer,
    isFilters = true,
    open = false,
    withoutSpace = true,
    isRequired,
    canStartWithNull = false,
    ...rest
  }: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, onOpen] = useState(false)
  const [value, setValue] = useState(rest.value)

  const { t } = useTranslate(['common'])

  const isPlaceholderLabel = label && !isFocused && !rest.value
  const placeholder = isPlaceholderLabel && !open ? label : rest.placeholder
  const withPasswordStrength = passwordStrength && type === 'password' && value
  const withErrorMessage = error && errorMessage && !rest.disabled
  const withSearch = type === 'search' && !rest.disabled && !rest.value && !rest.defaultValue && !value
  const isSelect = type === 'select'
  const labelSuffix = isRequired ? '*' : ''
  const classNameInput = cn(
    `focus:outline-none source-secondary-title overflow-hidden placeholder:source-text w-full disabled:text-border disabled:cursor-not-allowed
    hover:text-black placeholder:text-text group-hover:!bg-gray text-black focus:text-black border border-transparent disabled:bg-transparent disabled:placeholder:text-border`,
    {
      'group-hover:text-black focus:text-red caret-red': error,
      'placeholder:text-black': isPlaceholderLabel,
      'cursor-pointer': isSelect,
    },
    inputClassName
  )

  const onBlur = (e: FocusEvent<ExtendsReturnType<T>, Element>) => {
    setIsFocused(false)
    rest?.onBlur?.(e)
  }
  const onFocus = (e: FocusEvent<ExtendsReturnType<T>, Element>) => {
    setIsFocused(true)
    rest.onFocus?.(e)
  }

  const filterValue = (value: string) => {
    if (rest.maxLength) return getTrimmedString(value.trim(), 0, rest.maxLength)
    if (type === 'number' && value.startsWith('0') && isFilters && !canStartWithNull) return value.slice(1)
    if (withoutSpace) return value.trim()
    return value
  }

  useEffect(() => {
    setValue(rest.value)
  }, [rest.value])

  useEffect(() => {
    if (!value || !rest.value) setIsFocused(false)
  }, [value || rest.value])

  return (
    <div
      data-testid='input-wrapper'
      className={cn('group flex flex-col items-start w-full transition-[margin,colors] outline-none', className)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <label
        data-testid='input-label'
        htmlFor={name}
        className={cn('group-hover:text-primary text-black source-mobile-text desktop:source-text mb-0.5 ', {
          invisible: withoutLabel || rest.disabled || (((!open && !isFocused) || isSelect) && !value && !rest.value),
          hidden: withoutLabel,
          '!text-red group-hover:text-red': error,
          'text-gray': rest.disabled,
        })}
      >
        {label}
        <span className='text-red'>{` ${labelSuffix}`}</span>
      </label>
      <div
        data-testid='input-container'
        className={cn(
          'relative w-full flex items-center h-12 desktop:h-[50px] rounded-base border-border px-4 gap-base border bg-white group-hover:!bg-gray group-hover:border-black',
          classNameContainer,
          {
            '!border-black': isFocused || open,
            '!bg-gray !border-border': rest.disabled,
            '!border-red': error,
          }
        )}
      >
        {withSearch && (
          <Button variant='icon' disabled={rest.disabled}>
            <SearchSVG className='flex-shrink-0' />
          </Button>
        )}
        {prefixNode}
        {type === 'tel' ? (
          <PhoneInput
            defaultMask='(...)-...-..-..'
            alwaysDefaultMask
            specialLabel=''
            disableDropdown
            {...rest}
            placeholder={`${placeholder} ${labelSuffix}`}
            value={value as string}
            inputClass={classNameInput}
            containerClass='w-full'
            onChange={value => {
              setValue(value)
              ;(rest.onChange as onChangePhoneInput)?.(value)
            }}
            inputProps={{
              name,
              'aria-label': name,
              'data-testid': 'input',
            }}
          />
        ) : (
          <input
            {...rest}
            data-testid='input'
            ref={ref}
            id={name}
            name={name}
            type={isOpen ? 'text' : type}
            className={classNameInput}
            onChange={e => {
              e.target.value = filterValue(e.target.value)
              ;(rest.onChange as onChangeInput)?.(e)
              setValue(e.target.value)
            }}
            placeholder={`${placeholder} ${labelSuffix}`}
            autoComplete={type === 'password' ? 'new-password' : 'off'}
          />
        )}
        {type === 'password' && (
          <SuffixIconButton disabled={rest.disabled} isOpen={isOpen} error={error} onOpen={onOpen} />
        )}
        {suffixIcon}
      </div>
      {withPasswordStrength && (
        <div className='flex items-center justify-between w-full text-subtext whitespace-nowrap'>
          {getPasswordStrength(t, value as string)}
        </div>
      )}
      {withErrorMessage && <p className='source-text text-red select-none'>{errorMessage}</p>}
    </div>
  )
}

const getPasswordStrength = (t: TFunction, value: string) => {
  const password = t('password').toLocaleLowerCase()
  function getPasswordStrengthBlock(lineStyle: string, textStyle: string, text: string) {
    return [
      <span key='password-hard-line' className={`${lineStyle} h-0.5 rounded-sm`}></span>,
      <span key='password-hard-text' className={textStyle}>{`${text} ${password}`}</span>,
    ]
  }
  if (STRONG_PASSWORD_REG_EXP.test(value) || value.length >= 15)
    return getPasswordStrengthBlock('w-3/5 bg-green', 'text-green', t('hard'))
  if (MEDIUM_PASSWORD_REG_EXP.test(value))
    return getPasswordStrengthBlock('w-2/5 bg-orange', 'text-orange', t('medium'))
  if (WEAK_PASSWORD_REG_EXP.test(value)) return getPasswordStrengthBlock('w-1/5 bg-red', 'text-red', t('weak'))
}

const SuffixIconButton: FC<SuffixIconProps> = ({ onOpen, disabled, error, isOpen }) => {
  const SuffixIcon = isOpen ? OpenEye : CloseEye
  return (
    <button
      type='button'
      data-testid='eye-button'
      className={cn('input-focus focus-visible:ring-primary', {
        'focus-visible:ring-red': error,
      })}
      onClick={() => !disabled && onOpen(prev => !prev)}
    >
      <SuffixIcon
        className={cn('stroke-black w-[22px] h-[22px] cursor-pointer', {
          'stroke-gray !cursor-not-allowed': disabled,
        })}
      />
    </button>
  )
}

export const Input = forwardRef(InputComponent) as <T extends InputType>(
  props: InputProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputComponent>
