import { ReactNode, useMemo } from 'react'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { Select, SelectProps } from '../select'
import { range } from 'lodash'
import { getNumberWithDevider } from '@/shared/helpers'

export interface RangeSelectProps {
  name: string
  FromInputProps?: SelectProps<number>
  ToInputProps?: SelectProps<number>
  value?: Nullable<number[]>
  onChange?: (value: number[]) => void
  prefix?: ReactNode
  min?: number
  max?: number
}

export const RangeSelect: FCWithClassName<RangeSelectProps> = ({
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
  const options = useMemo(() => {
    const steps = range(Math.ceil(min / 500000) * 500000, max + 500000, 500000)
    const options = steps.map(option => {
      return { id: option, label: `${getNumberWithDevider(option, ',').toString()} ₽` }
    })
    return options
  }, [min, max])

  const onSelectChange = (type: 'from' | 'to') => (e: Nullable<number>) => {
    if (!!onChange && e && type === 'from') {
      onChange([e, value?.[1] || options[options.length - 1].id])
    }
    if (onChange && e && type === 'to') {
      onChange([value?.[0] || options[0].id, e])
    }
  }

  return (
    <div className={cn('flex gap-5', className)}>
      <Select
        {...rest}
        {...FromInputProps}
        name={`${name}-from`}
        label={t('From')}
        onChange={onSelectChange('from')}
        value={value && value[0]}
        options={options.filter(option => (value ? option.id < value[1] : true))}
        withClearButton={false}
      />
      <Select
        {...rest}
        {...ToInputProps}
        name={`${name}-to`}
        label={t('To')}
        onChange={onSelectChange('to')}
        value={value && value[1]}
        options={options.filter(option => (value ? option.id > value[0] : true))}
        withClearButton={false}
      />
    </div>
  )
}
