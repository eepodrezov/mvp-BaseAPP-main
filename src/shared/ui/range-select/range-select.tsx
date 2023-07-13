import { ReactNode, useMemo } from 'react'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { Select, SelectProps } from '../select'
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
    // до 5 миллионов делаем шаг 500тр
    // от 5 миллионов до 10 делаем шаг в 1 миллион
    // от 10 делаем шаг в 5 миллионов
    // от 30 делаем шаг в 10 миллионов
    const breakPoints = [
      {
        value: 5000000,
        breakPointStep: 1000000,
      },
      {
        value: 10000000,
        breakPointStep: 5000000,
      },
      {
        value: 30000000,
        breakPointStep: 10000000,
      },
    ]
    const initialStep = 500000
    const minStep = min < initialStep ? 0 : Math.ceil(min / initialStep) * initialStep
    const maxStep = max + (breakPoints.find(breakPoint => max > breakPoint.value)?.breakPointStep || 0)
    const steps: number[] = []
    for (let i = minStep; i < maxStep; ) {
      steps.push(i)
      const currentBreakPoint = breakPoints.findIndex(
        (breakPoint, bPIndex) =>
          i >= breakPoint.value && (i < breakPoints[bPIndex + 1]?.value || !breakPoints[bPIndex + 1])
      )
      const currentStep = breakPoints[currentBreakPoint]?.breakPointStep
      i += currentStep || initialStep
    }
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
