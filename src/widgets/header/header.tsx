import React, { FC } from 'react'
import { COMPANY_PHONE_NUMBER } from '@/shared/config'
import { Button } from '@/shared/ui'
import HeaderLogo from '@/shared/assets/icons/common/header-logo.svg'
import { ChangeLanguageButton, useTranslate } from '@/shared/lib'
import PhoneMenuIcon from '@/shared/assets/icons/common/phone-icon.svg'
import { useModalState } from '@/shared/hooks'
import { signInModalAtom } from '@/features/auth/basic'
import { viewerAtom, UserMenu, callbackModalAtom } from '@/entities/viewer'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'

export interface HeaderProps {
  isProfileHeader?: boolean
}

export const Header: FC<HeaderProps> = ({ isProfileHeader }) => {
  const { t } = useTranslate(['common'])
  const { onOpen: onOpenCallbackModal } = useModalState(callbackModalAtom)
  const { onOpen: onOpenSignInModal } = useModalState(signInModalAtom)
  const viewer = useAtomValue(viewerAtom)
  const router = useRouter()
  const withoutCallbackButton = router.pathname === '/'
  return (
    <header
      className={cn('sticky bg-white top-0 border-b border-black z-20 hidden tablet:flex h-[108px] w-full', {
        'h-[84px]': isProfileHeader,
      })}
    >
      <div
        className={cn('flex w-full justify-between items-center', {
          'desktop:pr-[60px] max-w-[2500px]': isProfileHeader,
          'desktop:px-[60px] mx-auto  max-w-[1440px]': !isProfileHeader,
        })}
      >
        <Link href='/'>
          <a
            className={cn({
              'px-[46px] py-large bg-black': isProfileHeader,
            })}
          >
            <HeaderLogo
              className={cn({
                'w-[170px] h-[26px] fill-white': isProfileHeader,
                'w-[204px] h-8 fill-black': !isProfileHeader,
              })}
            />
          </a>
        </Link>
        <div className='flex gap-[41px]'>
          <Button variant='text' className='text-lg source-mobile-title' href={`tel:${COMPANY_PHONE_NUMBER}`}>
            {COMPANY_PHONE_NUMBER}
          </Button>
          <div className='flex gap-5'>
            <Button
              variant='secondary'
              className={cn({ hidden: withoutCallbackButton })}
              childrenClassName='flex items-center gap-small'
              onClick={onOpenCallbackModal}
            >
              <PhoneMenuIcon className='fill-currentColor w-[30px]' />
              {t('callback')}
            </Button>
            {viewer ? <UserMenu /> : <Button onClick={onOpenSignInModal}>{t('Sign In')}</Button>}
          </div>
          <ChangeLanguageButton />
        </div>
      </div>
    </header>
  )
}
