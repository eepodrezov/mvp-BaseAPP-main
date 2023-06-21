import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Popover, Transition } from '@headlessui/react'
import { SetStateAction, useAtomValue, WritableAtom } from 'jotai'
import { RESET, useResetAtom, useUpdateAtom } from 'jotai/utils'
import { Fragment, PropsWithChildren } from 'react'
import { hasFiltersChangedAtom, isFiltersApplyAtom } from '@/entities/car'
import Dot from '@/shared/assets/icons/common/dot.svg'
import cn from 'classnames'

export interface FiltersFastHandProps<T> {
  label: string
  atom: WritableAtom<T, typeof RESET | SetStateAction<T>, void>
}

export const FiltersFastHand = <T,>({ children, label, atom }: PropsWithChildren<FiltersFastHandProps<T>>) => {
  const { t } = useTranslate(['common'])
  const value = useAtomValue(atom)
  const reset = useResetAtom(atom)
  const hasFiltersChanged = useAtomValue(hasFiltersChangedAtom)
  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button as={Fragment}>
            <Button
              variant='text'
              className={cn('source-secondary-title whitespace-nowrap', {
                'text-border': open,
              })}
              childrenClassName='flex'
            >
              <>
                {label}
                {!open && value && <Dot className='fill-currentColor' />}
              </>
            </Button>
          </Popover.Button>
          <Transition
            unmount={false}
            className='absolute left-0 z-10 w-full mt-[21px]'
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Popover.Panel static className='flex flex-col w-full gap-5 p-5 bg-white border-b border-black'>
              <div className='sticky top-0 flex items-center justify-between w-full mb-5'>
                <p className='text-black croogla-modile'>{label}</p>
                <Popover.Button as={Fragment}>
                  <Button
                    variant='text'
                    onClick={() => {
                      reset()
                      setIsFiltersApply(true)
                    }}
                    className='source-mobile-sub-text'
                  >
                    {t('Reset')}
                  </Button>
                </Popover.Button>
              </div>
              {children}
              {hasFiltersChanged && (
                <Popover.Button as={Fragment}>
                  <Button variant='text' className='self-end' onClick={() => setIsFiltersApply(true)}>
                    {t('Apply')}
                  </Button>
                </Popover.Button>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
