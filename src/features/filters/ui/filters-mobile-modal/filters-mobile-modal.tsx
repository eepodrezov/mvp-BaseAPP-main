import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button, ButtonMobileFixedWrapper } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import { FiltersContent } from '../filters-content'
import { FiltersResetButton } from '../filters-reset-button'
import { useAtomValue } from 'jotai'
import { hasFiltersChangedAtom, isFiltersApplyAtom } from '@/entities/car'
import { useModalState } from '@/shared/hooks'
import { filtersMobileModalAtom } from '../../model'
import FiltersIcon from '@/shared/assets/icons/common/filters.svg'
import CloseIcon from '@/shared/assets/icons/common/close.svg'
import cn from 'classnames'
import { useUpdateAtom } from 'jotai/utils'

export const FiltersMobileModal: FC = () => {
  const { t } = useTranslate(['common', 'car'])
  const { isOpen, onOpen, onClose } = useModalState(filtersMobileModalAtom)
  const hasFiltersChanged = useAtomValue(hasFiltersChangedAtom)
  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)
  function onApply() {
    setIsFiltersApply(true)
    onClose()
  }

  return (
    <>
      <Button variant='text' childrenClassName='flex items-center gap-base' onClick={onOpen}>
        <FiltersIcon className='stroke-currentColor' />
        {t('car:Filters')}
      </Button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-30 w-full h-screen bg-white' onClose={onClose}>
          <Transition.Child
            enter='ease-out duration-200'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <>
              <div className='flex items-center justify-between px-5 min-h-[80px] border-b border-black'>
                <Button variant='text' onClick={onClose}>
                  <CloseIcon className='w-10 h-10 stroke-currentColor' />
                </Button>
                <p className='text-black croogla-text'>{t('car:Filters')}</p>
                <FiltersResetButton className='source-mobile-sub-text' />
              </div>
              <FiltersContent
                className={cn('h-[calc(100vh-80px)] overflow-auto', {
                  'pb-20': hasFiltersChanged,
                })}
              />
              {hasFiltersChanged && (
                <ButtonMobileFixedWrapper wrapperClassName='pb-24' onClick={onApply}>
                  {t('common:Apply')}
                </ButtonMobileFixedWrapper>
              )}
            </>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
