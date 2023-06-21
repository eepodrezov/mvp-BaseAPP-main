import { PickerPanel } from 'rc-picker'
import { FCWithClassName, Nullable } from '@/shared/@types'
import {
  DEFAULT_DATE_FORMAT,
  LANG_RU,
  PLACEHOLDER_DATE,
  SHORT_MONTHS_NAME,
  SHORT_WEEK_DAYS_NAME,
} from '@/shared/config'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import { PickerPanelDateProps } from 'rc-picker/lib/PickerPanel'
import dayjs, { Dayjs } from 'dayjs'
import ArrowIcon from '@/shared/assets/icons/common/datepicker-arrow.svg'
import generateConfig from 'rc-picker/lib/generate/dayjs'
import ruRu from 'rc-picker/lib/locale/ru_RU'
import enUS from 'rc-picker/lib/locale/en_US'
import cn from 'classnames'
import utc from 'dayjs/plugin/utc'
import Calendar from '@/shared/assets/icons/common/calendar.svg'
import { useRouter } from 'next/router'
import {
  useFloating,
  useInteractions,
  flip,
  useClick,
  useDismiss,
  autoUpdate,
  offset,
} from '@floating-ui/react-dom-interactions'
import { useState } from 'react'
import { motion } from 'framer-motion'

dayjs.extend(utc)

export interface DatepickerProps
  extends Omit<PickerPanelDateProps<Dayjs>, 'value' | 'onChange' | 'locale' | 'generateConfig'> {
  name: string
  label?: string
  value?: Nullable<Date> | string
  disabled?: boolean
  inputProps?: Omit<InputProps, 'name'>
  rangePickerClassName?: string
  onChange?: (value: Nullable<string>) => void
  isRequired?: boolean
}

// Если брать этот компонент для формы, то только через Controller
export const Datepicker: FCWithClassName<DatepickerProps> = ({
  name,
  label,
  value,
  className,
  disabled,
  inputProps,
  rangePickerClassName,
  onChange,
  isRequired,
  defaultPickerValue,
  ...rest
}) => {
  Object.assign(ruRu, { shortWeekDays: SHORT_WEEK_DAYS_NAME })
  Object.assign(ruRu, { shortMonths: SHORT_MONTHS_NAME })
  const { locale } = useRouter()
  const inputValue = value ? dayjs(value).utc(true).format(DEFAULT_DATE_FORMAT) : ''
  const datepickerValue = value ? dayjs(value) : null
  const [open, setOpen] = useState(false)
  const { reference, floating, context, strategy, y } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip()],
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { pointerDown: true, enabled: !disabled }),
    useDismiss(context),
  ])
  return (
    <>
      <div className='w-full' {...getReferenceProps({ ref: reference })}>
        <Input
          {...inputProps}
          inputClassName={cn('cursor-pointer caret-transparent', inputProps?.inputClassName)}
          classNameContainer={cn('gap-0 cursor-pointer', inputProps?.classNameContainer, {
            '!cursor-not-allowed': disabled,
          })}
          name={name}
          isRequired={isRequired}
          value={inputValue}
          open={open}
          disabled={disabled}
          placeholder={PLACEHOLDER_DATE}
          suffixIcon={<Calendar className='stroke-black' />}
        />
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          {...getFloatingProps({
            ref: floating,
            className: cn(
              'w-full max-w-[310px] desktop:max-w-[380px]  bg-white px-large py-[29px] right-0 shadow-base rounded-xl',
              className
            ),
            style: {
              position: strategy,
              top: y ?? 0,
              right: 20,
            },
          })}
        >
          <PickerPanel
            {...rest}
            locale={locale === LANG_RU ? ruRu : enUS}
            // В либе не правильно описаны пропсы
            // @ts-expect-error
            prevIcon={
              <Button variant='icon' color='secondary'>
                <ArrowIcon className='fill-black' />
              </Button>
            }
            superPrevIcon={
              <Button variant='icon' color='secondary' childrenClassName='flex' className='mr-small'>
                <ArrowIcon className='fill-black' />
                <ArrowIcon className='fill-black' />
              </Button>
            }
            nextIcon={
              <Button variant='icon' color='secondary' className='ml-small'>
                <ArrowIcon className='fill-black rotate-180' />
              </Button>
            }
            superNextIcon={
              <Button variant='icon' color='secondary' childrenClassName='flex' className='ml-small rotate-180'>
                <ArrowIcon className='fill-black' />
                <ArrowIcon className='fill-black' />
              </Button>
            }
            showTime={false}
            value={datepickerValue}
            defaultPickerValue={defaultPickerValue}
            onChange={value => {
              onChange?.(value.startOf('D').utc(true).format())
              setOpen(false)
            }}
            generateConfig={generateConfig}
          />
        </motion.div>
      )}
    </>
  )
}
