import { Fragment } from 'react'
import SortIcon from '@/shared/assets/icons/common/sort.svg'
import Arrow from '@/shared/assets/icons/common/select-arrow.svg'
import { FCWithClassName, Nullable, SelectOption, Sort } from '@/shared/@types'
import { DEFAULT_ORDER_VALUE, SORT_ASC, SORT_DESC } from '@/shared/config'
import { Listbox, Transition } from '@headlessui/react'
import { Button } from '../button'
import { useTranslate } from '@/shared/lib'
import { getOrderEqual, getOrderValue } from '@/shared/helpers'
import cn from 'classnames'

export type OrderValue = {
  field: string
  order: Sort
  label?: string
}

export interface SortingProps {
  value?: Nullable<OrderValue>
  options: (Omit<SelectOption, 'id'> & { id: string })[]
  disabled?: boolean
  onChange: (value: OrderValue) => void
}

export const Sorting: FCWithClassName<SortingProps> = ({
  value = DEFAULT_ORDER_VALUE,
  options,
  onChange,
  className,
  ...rest
}) => {
  const { t } = useTranslate(['common', 'car'])

  return (
    <Listbox
      as='div'
      value={value}
      onChange={onChange}
      {...rest}
      by={(a, b) => getOrderEqual(a, b)}
      className={cn('relative z-10', className)}
    >
      <Listbox.Button as={Fragment}>
        <Button variant='text'>
          <div className='flex items-center gap-small source-secondary-title'>
            <SortIcon className='fill-currentColor' />
            <span className='hidden desktop:block'>
              {t('sortBy')} {t(value?.label ? `car:${value.label}` : 'newlyListed')}
            </span>
            <Arrow className='hidden stroke-currentColor desktop:block' />
          </div>
        </Button>
      </Listbox.Button>
      <Transition
        className='absolute top-0 right-0 desktop:left-0'
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Listbox.Options className='list'>
          <div className='flex items-center justify-between px-5 text-text min-h-[50px]'>
            <div className='flex items-center'>
              <SortIcon className='fill-currentColor shrink-0 mr-3.5' />
              <span className='w-[119px] truncate text-left'>{t('sorting')}</span>
            </div>
            {value && !getOrderEqual(value, DEFAULT_ORDER_VALUE) && (
              <Listbox.Option value={DEFAULT_ORDER_VALUE} as={Fragment}>
                <Button variant='text' className='source-mobile-sub-text'>
                  {t('reset')}
                </Button>
              </Listbox.Option>
            )}
          </div>
          <Listbox.Option value={DEFAULT_ORDER_VALUE}>{t('newlyListed')}</Listbox.Option>
          {options.map(option => (
            <Fragment key={option.id}>
              <Listbox.Option value={getOrderValue(option, SORT_ASC)} disabled={option.disabled}>
                {t('car:' + option.label) + ': ' + t(option.label === 'year' ? 'Newer' : 'lowToHigh')}
              </Listbox.Option>
              <Listbox.Option value={getOrderValue(option, SORT_DESC)} disabled={option.disabled}>
                {t('car:' + option.label) + ': ' + t(option.label === 'year' ? 'Older' : 'highToLow')}
              </Listbox.Option>
            </Fragment>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}
