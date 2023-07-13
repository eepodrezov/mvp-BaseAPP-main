import { SidebarTabs, SidebarTabItem } from '@/shared/ui/sidebar-tabs'
import { Favorites, Info, Orders, PrivateInfo, Settings, Stock } from '@/shared/assets/icons/sidebar-icons'
import { Button } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import LogOutIcon from '@/shared/assets/icons/common/log-out.svg'
import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import {
  PROFILE_PRIVATE_URL,
  PROFILE_ORDERS_URL,
  PROFILE_FAVORITES_URL,
  PROFILE_SETTINGS_URL,
  PROFILE_INFO_URL,
  PROFILE_STOCK_URL,
  PROFILE_WIDGET_URL,
} from './lib'
import { logoutViewer, ROLE_DEALER, viewerAtom } from '@/entities/viewer'
import { useAtom } from 'jotai'

interface ProfilePageNavbarProps {
  close?: () => void
}

export const ProfilePageNavbar: FCWithClassName<ProfilePageNavbarProps> = ({ className, close }) => {
  const { t } = useTranslate(['profile', 'common', 'car'])
  const [viewer, setViewer] = useAtom(viewerAtom)
  const tabs: SidebarTabItem[] = [
    { name: t('Private info'), icon: <PrivateInfo className='fill-currentColor' />, url: PROFILE_PRIVATE_URL },
    {
      name: t('Stock'),
      icon: <Stock className='stroke-currentColor' />,
      url: PROFILE_STOCK_URL,
      tabClassName: cn({ hidden: !viewer?.roles.includes(ROLE_DEALER) }),
    },
    {
      name: t('MyOrders'),
      icon: <Orders className='stroke-currentColor' />,
      url: PROFILE_ORDERS_URL,
      childrenPage: true,
    },
    { name: t('car:favorites'), icon: <Favorites className='stroke-currentColor' />, url: PROFILE_FAVORITES_URL },
    { name: t('Settings'), icon: <Settings className='stroke-currentColor' />, url: PROFILE_SETTINGS_URL },
    //Может пригодиться в дальнейшем
    // { name: t('Payment history'), icon: <Payments className='stroke-currentColor' />, url: PROFILE_PAYMENTS_URL },
    { name: t('Help'), icon: <Info className='fill-currentColor' />, url: PROFILE_INFO_URL },
    { name: t('Widget'), icon: <Info className='fill-currentColor' />, url: PROFILE_WIDGET_URL },
  ]

  return (
    <div
      className={cn(
        className,
        'tablet:w-[262px] px-5 tablet:px-large tablet:bg-black flex flex-col tablet:items-center gap-large tablet:justify-between'
      )}
    >
      <div className='flex flex-col gap-large tablet:items-center'>
        <Button
          href='/'
          variant='text'
          childrenClassName='text-white group-hover:text-red active:text-red'
          className='text-white source-text py-small px-base w-[202px] flex !justify-start'
        >
          {t('Back to Catalogue')}
        </Button>
        <SidebarTabs onChange={close} tabs={tabs} className='w-full' />
      </div>
      <Button
        variant='text'
        className='text-white source-text w-[202px] px-[17px] py-[13px] flex !justify-start'
        childrenClassName='flex gap-small group'
        href='/'
        onClick={() => logoutViewer(setViewer)}
      >
        <LogOutIcon className='stroke-currentColor' />
        {t('common:logout')}
      </Button>
    </div>
  )
}
