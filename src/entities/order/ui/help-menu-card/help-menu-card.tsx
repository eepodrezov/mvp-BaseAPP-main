import { callbackModalAtom } from '@/entities/viewer'
import { HelpIcon } from '@/shared/assets/icons/car-overview'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Menu, Transition } from '@headlessui/react'
import cn from 'classnames'
import { ButtonHTMLAttributes, FC, Fragment } from 'react'

export interface HelpMenuCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  srcTelegram?: string
}

export const HelpMenuCard: FC<HelpMenuCardProps> = ({ srcTelegram, className, ...rest }) => {
  const { t } = useTranslate(['car', 'common', 'profile'])
  const { onOpen: onOpenCallbackModal } = useModalState(callbackModalAtom)
  return (
    <Menu as='div'>
      <Menu.Button as={Fragment}>
        <Button
          className={cn('!min-h-fit !w-auto border-none shadow-none', className)}
          variant='bordered-icon'
          {...rest}
        >
          <HelpIcon className='stroke-currentColor' />
        </Button>
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Menu.Items className='absolute -translate-x-[85%] main:-translate-x-full -translate-y-[94%] main:-translate-y-1/4 list'>
          <Menu.Item as='div' className='flex gap-2 h-[50px] text-border px-5 py-[13px]'>
            <HelpIcon className='stroke-border' /> <p className='source-text text-text'> {t('profile:Help')} </p>
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <Button
                variant='text'
                href={srcTelegram}
                className='flex !justify-start'
                childrenClassName='source-text h-[50px] px-5 py-[13px]'
                onClick={e => {
                  e.preventDefault()
                  close()
                }}
              >
                {t('Telegram Chat')}
              </Button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <Button
                variant='text'
                onClick={e => {
                  e.preventDefault()
                  close()
                  onOpenCallbackModal()
                }}
                className='flex !justify-start'
                childrenClassName='source-text h-[50px] px-5 py-[13px]'
              >
                {t('common:callback')}
              </Button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
