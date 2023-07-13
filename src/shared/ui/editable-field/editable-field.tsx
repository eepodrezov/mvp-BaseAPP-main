import { useState, cloneElement, InputHTMLAttributes, ReactElement, ChangeEvent, useMemo } from 'react'
import EditIcon from '@/shared/assets/icons/common/edit-icon.svg'
import { useTranslate } from '@/shared/lib'
import SubmitIcon from '@/shared/assets/icons/common/submit-icon.svg'
import SelectClose from '@/shared/assets/icons/common/select-close.svg'
import { FCWithClassName, Nullable, SelectOption } from '@/shared/@types'
import { Button, Variant } from '../button'
import cn from 'classnames'
import { EMAIL_REG_EXP } from '@/shared/config'
import { TrancateContainer } from '../truncate-container'
export interface EditableFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSelect' | 'onSubmit'> {
  isSmallVariant?: boolean
  value?: Nullable<string | number>
  label?: string
  type?: 'search' | 'input' | 'tel' | 'email'
  variantBtn?: Variant
  isEditable?: boolean
  childrenClassName?: string
  renderClassName?: string
  textClassName?: string
  wrapperClassName?: string
  extraContent?: ReactElement
  fieldWithoutForm?: boolean
  validateChild?: RegExp
  errorMessage?: string
  withTruncate?: boolean
  maxWidth?: number
  emptyText?: string
  withCancelIcon?: boolean
  classNameCloseIcon?: string
  disabled?: boolean
  onChange?: (value: Nullable<string | number>) => void
  onSubmit?: (value: Nullable<string | number>) => void
  formatter?: (value: number | undefined) => void
}

export const EditableField: FCWithClassName<EditableFieldProps & { children: ReactElement }> = ({
  children,
  variantBtn = 'icon',
  isSmallVariant,
  value,
  className,
  label,
  type = 'search',
  isEditable = true,
  renderClassName,
  extraContent = null,
  textClassName,
  childrenClassName,
  fieldWithoutForm,
  errorMessage,
  withTruncate,
  maxWidth = 200,
  emptyText = '',
  withCancelIcon,
  classNameCloseIcon,
  disabled,
  onChange,
  onSubmit,
  formatter,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const { t } = useTranslate(['common'])
  const [currentValue, setCurrentValue] = useState<Nullable<string | number>>(() =>
    children.props.type === 'number' && !value ? 0 : value || ''
  )
  const [error, setError] = useState(false)

  const isSearch = type === 'search'
  const isMobile = type === 'tel'
  const isEmail = type === 'email'
  const isErrorChild = (isEmail || isMobile) && fieldWithoutForm && currentValue

  const renderValue = useMemo(() => {
    if (isSearch)
      return children.props.options?.find((option: SelectOption) => option.id === value)?.label || currentValue
    return currentValue
  }, [currentValue])

  const setErrorChild = (value: string) => {
    if ((isEmail && !EMAIL_REG_EXP.test(value)) || (isMobile && value.length !== 11)) setError(true)
    else setError(false)
  }

  const customOnChange = (value: Nullable<string | number>) => {
    if (isMobile && fieldWithoutForm) setErrorChild(value as string)
    if (isEmail) setErrorChild(value as string)
    if (children.props.type === 'number' && (!value || Number(value) < 0)) [setCurrentValue(0), onChange?.(0)]
    else [setCurrentValue(value), onChange?.(value)]
  }

  const setValue = () => [setIsEdit(false), setError(false), customOnChange(currentValue), onSubmit?.(currentValue)]

  const renderSuffixIcon = !!(currentValue || value) && (
    <Button variant='icon' data-testid='save-button' disabled={error} onClick={setValue}>
      <SubmitIcon className='stroke-currentColor' data-testid='editable-field-submit-icon' />
    </Button>
  )

  const propsSelectSearch = {
    searchedValue: currentValue,
    open: isEdit,
    inputProps: {
      suffixIcon: renderSuffixIcon,
    },
  }

  return (
    <div
      className={className}
      data-testid='editable-wrapper'
      {...(!error && currentValue && { onBlur: () => setValue() })}
      onClick={e => e.preventDefault()}
    >
      <div
        data-testid='editable-field-wrapper'
        className={cn('flex gap-small justify-between items-bottom', renderClassName, {
          '!flex-row': isEdit,
          'flex-col': isSmallVariant,
        })}
      >
        <div className='source-mobile-text desktop:source-text'>{label}</div>
        {isEdit ? (
          <Button
            onClick={() => [setIsEdit(false), setCurrentValue(currentValue)]}
            variant={withCancelIcon ? 'icon' : 'text'}
            className={classNameCloseIcon}
          >
            {withCancelIcon ? <SelectClose /> : t('cancel')}
          </Button>
        ) : (
          <div
            className={cn('flex', {
              'flex-row-reverse': !isSmallVariant,
              'gap-[14px]': currentValue || currentValue === 0 || !(currentValue && isSearch),
            })}
          >
            {renderValue || renderValue === 0 ? (
              withTruncate ? (
                <TrancateContainer maxWidth={maxWidth} className='source-secondary-title'>
                  {formatter?.(renderValue) || renderValue}
                </TrancateContainer>
              ) : (
                <div className={cn('source-secondary-title', textClassName)}>
                  {formatter?.(renderValue) || renderValue}
                </div>
              )
            ) : (
              <div className='source-secondary-title'>{emptyText}</div>
            )}
            {isEditable && (
              <Button
                variant={variantBtn}
                data-testid='edit-field-edit-button'
                disabled={disabled}
                onClick={() => setIsEdit(true)}
              >
                <EditIcon className='fill-currentColor' />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className={cn(childrenClassName, { 'mt-small': !isSearch })}>
        {isEdit && (
          <div data-testid='edit-field-children'>
            {cloneElement(children, {
              ...children.props,
              value: currentValue,
              placeholder: label || children.props.placeholder,
              onChange: (event: string | ChangeEvent<HTMLInputElement>) =>
                customOnChange(
                  isMobile || isSearch ? (event as string) : (event as ChangeEvent<HTMLInputElement>).target.value
                ),
              ...(isErrorChild && { error, errorMessage }),
              ...(isSearch && propsSelectSearch),
              suffixIcon: renderSuffixIcon,
            })}
          </div>
        )}
        {(currentValue || currentValue === 0) && !isEdit && extraContent}
      </div>
    </div>
  )
}
