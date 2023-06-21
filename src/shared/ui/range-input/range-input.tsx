import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from 'react'
import Slider, { SliderProps } from 'rc-slider'
import { Input } from '../input'
import { useTranslate } from '@/shared/lib'
import debounce from 'lodash.debounce'
import cn from 'classnames'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { InputProps } from '../input/lib'

export interface RangeInputProps extends Omit<SliderProps, 'value' | 'onChange'> {
  name: string
  FromInputProps?: InputProps
  ToInputProps?: InputProps
  value?: Nullable<number[]>
  onChange?: (value: number[]) => void
  prefix?: ReactNode
}

export const RangeInput: FCWithClassName<RangeInputProps> = ({
  name,
  FromInputProps,
  ToInputProps,
  value,
  min = 0,
  max = 0,
  className,
  onChange,
  prefix,
  ...rest
}) => {
  const { t } = useTranslate(['common'])
  const [currentValue, setCurrentValue] = useState([min || 0, max || 0])

  const onDelayChange = useCallback(
    debounce((value: number[]) => onChange?.(value), 2000),
    [onChange]
  )

  const onInputChange = (type: 'from' | 'to') => (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value
    let rangeValue = currentValue
    value < min && (value = min)
    value > max && (value = max)

    if (type === 'from') {
      rangeValue = [value, currentValue[1]]
      value > currentValue[1] && rangeValue.reverse()
    } else {
      rangeValue = [currentValue[0], value]
      value < currentValue[0] && rangeValue.reverse()
    }

    onDelayChange(rangeValue)
  }

  const onInputType = (type: 'from' | 'to') => (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    if (type === 'from') {
      setCurrentValue([value, currentValue[1]])
    } else {
      setCurrentValue([currentValue[0], value])
    }
  }

  useEffect(() => {
    setCurrentValue(Array.isArray(value) ? value : [min || 0, max || 0])
  }, [value, min, max])

  return (
    <div className={cn('flex flex-col gap-large', className)}>
      <div className='flex gap-5'>
        <Input
          isFilters={FromInputProps?.isFilters}
          name={`${name}-from`}
          withoutLabel
          placeholder={t('from')}
          {...FromInputProps}
          type='number'
          value={currentValue[0]}
          onInput={onInputType('from')}
          onChange={onInputChange('from')}
          prefixNode={prefix}
        />
        <Input
          isFilters={ToInputProps?.isFilters}
          name={`${name}-to`}
          withoutLabel
          placeholder={t('to')}
          {...ToInputProps}
          type='number'
          value={currentValue[1]}
          onInput={onInputType('to')}
          onChange={onInputChange('to')}
          prefixNode={prefix}
        />
      </div>
      <Slider
        range
        min={min}
        max={max}
        value={currentValue}
        onChange={e => setCurrentValue(e as number[])}
        onAfterChange={debounce(e => onChange?.(e), 400)}
        {...rest}
      />
    </div>
  )
}
