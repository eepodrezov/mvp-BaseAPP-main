import { UserMenu } from '@/entities/viewer'
import { BurgerMenu } from '@/features'
import { FC } from 'react'
import HeaderLogo from '@/shared/assets/icons/common/header-logo.svg'
import Link from 'next/link'

export interface HeaderMobileProps {
  burgerMenuContent?: JSX.Element
}

export const HeaderMobile: FC<HeaderMobileProps> = ({ burgerMenuContent }) => {
  return (
    <header className='tablet:hidden sticky z-20 top-0 max-w-[1440px] bg-white flex items-center border-b border-black justify-between w-full p-5'>
      <BurgerMenu>{burgerMenuContent}</BurgerMenu>
      <Link href='/'>
        <a>
          <HeaderLogo className='w-40 h-[25px] fill-black' />
        </a>
      </Link>
      <UserMenu />
    </header>
  )
}
