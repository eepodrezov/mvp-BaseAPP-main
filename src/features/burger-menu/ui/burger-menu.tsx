import { ChangeLanguageButton, useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Menu, Transition } from '@headlessui/react'
import { ButtonHTMLAttributes, Fragment } from 'react'
import BurgerMenuIcon from '@/shared/assets/icons/common/burger-icon.svg'
import Close from '@/shared/assets/icons/common/close.svg'
import cn from 'classnames'
import { FCWithChildren } from '@/shared/@types'

export const BurgerMenu: FCWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  const { t } = useTranslate(['common'])

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button as={Fragment}>
            <Button
              variant='bordered-icon'
              data-testid='iconOpen'
              className={cn('!min-h-[40px]', { visible: open })}
              {...rest}
            >
              <BurgerMenuIcon className='stroke-currentColor' />
            </Button>
          </Menu.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
            as={Fragment}
          >
            <div className='absolute top-0 left-0 z-20 w-full h-screen overflow-hidden'>
              <Menu.Items>
                <div className='flex items-center justify-between max-h-[80px] w-full p-5 bg-white'>
                  <Menu.Item>
                    <Button
                      variant='bordered-icon'
                      data-testid='iconClose'
                      className={cn({ '!border-transparent !shadow-none': open })}
                    >
                      <Close className='w-10 h-10 stroke-currentColor' />
                    </Button>
                  </Menu.Item>
                  <p className='text-black croogla-text'>{t('menu')}</p>
                  <ChangeLanguageButton />
                </div>
                <div className='bg-black'>
                  <div
                    className={cn({
                      'border-t border-black': open,
                    })}
                  >
                    {children}
                  </div>
                </div>
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}
