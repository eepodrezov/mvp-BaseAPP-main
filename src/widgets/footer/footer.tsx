import { COMPANY_PHONE_NUMBER, LANG_RU, PROJECT_VERSION } from '@/shared/config'
import { useModalState, useWindowDimensions } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import PhoneIcon from '@/shared/assets/icons/common/phone-icon.svg'
import { Button, ButtonSocial, ButtonSocialType } from '@/shared/ui'
import cn from 'classnames'
import Link from 'next/link'
import { FCWithClassName } from '@/shared/@types'
import { useRouter } from 'next/router'
import { callbackModalAtom } from '@/entities/viewer'

export const Footer: FCWithClassName = ({ className }) => {
  const { onOpen: onOpenCallbackModal } = useModalState(callbackModalAtom)
  const { t } = useTranslate(['common'])
  const links = [
    { href: '/feedback', label: t('Feedback') },
    // { href: '/company', label: t('Company') },
    { href: '/admin', label: t('Company') },
    { href: '/contacts', label: t('Contacts') },
    { href: '/returnAndExchange', label: t('Return&Exchange') },
    { href: '/privacyPolicy', label: t('Privacy Policy') },
  ]
  // TODO:Добавить ссылки
  const buttonsLink: { type: ButtonSocialType; link: string }[] = [
    { type: 'facebook', link: '' },
    { type: 'twitter', link: '' },
    { type: 'instagram', link: '' },
    { type: 'linkedin', link: '' },
  ]
  const { isTablet } = useWindowDimensions()
  const { locale, pathname } = useRouter()
  const withoutCallbackButton = pathname === '/'
  return (
    <footer className={cn('w-full bg-black', className)}>
      <div
        className={cn(
          `w-full flex max-w-[1440px] max-[400px]:px-5 py-10 px-[60px] justify-between mx-auto max-[1250px]:items-start
           max-[1250px]:flex-col max-[1250px]:gap-[50px] desktop:gap-large flex-row items-center gap-0`,
          {
            'max-main:items-start max-main:flex-col max-main:gap-[50px]': isTablet && locale === LANG_RU,
          }
        )}
      >
        <div className='flex max-[500px]:flex-col-reverse flex-col gap-large'>
          <div
            className={cn('flex max-[500px]:flex-col items-start flex-row gap-large', {
              'min-[1400px]:whitespace-nowrap': locale === LANG_RU,
            })}
          >
            <a onClick={onOpenCallbackModal} className={cn('dark-link text-xl', { hidden: withoutCallbackButton })}>
              {t('callback')}
            </a>
            <Button
              variant='text-gray'
              childrenClassName='flex gap-small items-center font-bold source-text'
              href={`tel:${COMPANY_PHONE_NUMBER}`}
            >
              <PhoneIcon className='fill-currentColor' />
              {COMPANY_PHONE_NUMBER}
            </Button>
          </div>
          <div className='flex gap-[53px] desktop:gap-large'>
            {buttonsLink.map(({ link, type }) => (
              <ButtonSocial key={type} type={type} link={link} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-[50px]'>
          <div
            className={cn(
              'flex max-[500px]:flex-col max-[1250px]:flex-wrap flex-nowrap gap-large max-[1250px]:justify-start justify-end',
              { 'max-main:justify-start': isTablet && locale === LANG_RU }
            )}
          >
            {links.map(({ label, href }) => (
              <Link key={href} href={href}>
                <a className='dark-link text-xl'>{label}</a>
              </Link>
            ))}
          </div>
          <p
            className={cn('text-gray text-lg text-end source-text', {
              'min-[1400px]:whitespace-nowrap': locale === LANG_RU,
            })}
          >
            {t('©™ ANTCAR Internet Services, LLC. All rights reserved. Developed by Webant LLC ')}
            <p className='whitespace-nowrap'>{`v-${PROJECT_VERSION}`}</p>
          </p>
        </div>
      </div>
    </footer>
  )
}
