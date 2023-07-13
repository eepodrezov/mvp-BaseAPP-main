import { ChangeEvent, InputHTMLAttributes, HTMLInputTypeAttribute, ReactNode, SetStateAction } from 'react'
import { PhoneInputProps } from 'react-phone-input-2'

export type TypeMobilePhone = 'tel'

export type onChangePhoneInput = (value: string) => void

export type onChangeInput = (e: ChangeEvent<HTMLInputElement>) => void

export type onChangeReturnType<T> = T extends TypeMobilePhone ? onChangePhoneInput : onChangeInput

export type ExtendsReturnType<T> = T extends TypeMobilePhone ? HTMLInputElement & PhoneInputProps : HTMLInputElement

export type InputType = HTMLInputTypeAttribute | TypeMobilePhone | undefined

export interface InputProps<T extends InputType = 'text'>
  extends Omit<InputHTMLAttributes<ExtendsReturnType<T>>, 'onChange'> {
  name?: string
  label?: string
  error?: boolean
  errorMessage?: string
  passwordStrength?: boolean
  withoutLabel?: boolean
  suffixIcon?: ReactNode
  prefixNode?: ReactNode
  inputClassName?: string
  type?: T
  isFilters?: boolean
  open?: boolean
  classNameContainer?: string
  withoutSpace?: boolean
  onChange?: onChangeReturnType<T>
  isRequired?: boolean
  canStartWithNull?: boolean
}

export interface SuffixIconProps {
  disabled?: boolean
  isOpen?: boolean
  error?: boolean
  onOpen: (value: SetStateAction<boolean>) => void
}
