import { Header } from '@/widgets/header'
import { HeaderMobile } from '@/widgets/header-mobile'
import { ProfilePageNavbar } from '@/widgets/profile-page-navbar'
import { BurgerCallbackContent } from '@/features/burger-callback-content'
import { Menu } from '@headlessui/react'
import { FCWithChildren } from '@/shared/@types'
import cn from 'classnames'

export interface ProfileLayoutProps {
  withMarginBottom?: boolean
}

export const ProfileLayout: FCWithChildren<ProfileLayoutProps> = ({ children, withMarginBottom = true }) => (
  <>
    <Header isProfileHeader={true} />
    <HeaderMobile burgerMenuContent={<BurgerMenuContent />} />
    <div className='flex'>
      <div className='hidden min-[1280px]:block'>
        <ProfilePageNavbar className='h-[calc(100vh-84px)] sticky top-[84px] overflow-auto overflow-x-hidden' />
      </div>
      <main
        className={cn(
          'flex flex-col max-w-screen-main w-full min-h-mobile-content-without-footer desktop:min-h-content-without-footer',
          { 'mb-large': withMarginBottom }
        )}
      >
        {children}
      </main>
    </div>
  </>
)

const BurgerMenuContent = () => {
  return (
    <Menu.Item>
      {({ close }) => (
        <div className='h-[calc(100vh-80px)] overflow-auto'>
          <ProfilePageNavbar className='overflow-auto' close={close} />
          <BurgerCallbackContent isBlack />
        </div>
      )}
    </Menu.Item>
  )
}
