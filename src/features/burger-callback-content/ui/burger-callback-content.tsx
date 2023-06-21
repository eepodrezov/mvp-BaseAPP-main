import { Button } from '@/shared/ui'
import { COMPANY_PHONE_NUMBER } from '@/shared/config'
import PhoneMenuIcon from '@/shared/assets/icons/common/phone-icon.svg'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Menu } from '@headlessui/react'
import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { callbackModalAtom } from '@/entities/viewer'

export interface BurgerCallbackContent {
  isBlack?: boolean
}

export const BurgerCallbackContent: FCWithClassName<BurgerCallbackContent> = ({ className, isBlack = false }) => {
  const { onOpen } = useModalState(callbackModalAtom)
  const { t } = useTranslate(['common'])
  const router = useRouter()
  const withoutCallbackButton = router.pathname === '/'
  return (
    <div
      className={cn('w-full text-center px-5 pt-10 flex flex-col items-center gap-large', className, {
        'bg-black pb-24 pt-[60px]': isBlack,
        'bg-white min-h-screen': !isBlack,
      })}
    >
      <Menu.Item>
        {({ close }) => (
          <Button
            variant='text'
            data-testid='phoneButton'
            className={cn('text-lg source-mobile-title', {
              'text-white': isBlack,
            })}
            onClick={close}
            href={`tel:${COMPANY_PHONE_NUMBER}`}
          >
            {COMPANY_PHONE_NUMBER}
          </Button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ close }) => (
          <Button
            variant='secondary'
            data-testid='callbackButton'
            className={cn('!bg-white', { hidden: withoutCallbackButton })}
            fullWidth
            childrenClassName='flex items-center gap-small'
            onClick={() => {
              close()
              onOpen()
            }}
          >
            <PhoneMenuIcon className='fill-currentColor' />
            {t('callback')}
          </Button>
        )}
      </Menu.Item>
    </div>
  )
}
