import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { HeaderMobile } from '@/widgets/header-mobile'
import { FC, PropsWithChildren } from 'react'
import { BurgerCallbackContent } from '@/features/burger-callback-content'

export interface ContentLayoutProps {
  withHeaderMobile?: boolean
  withFooter?: boolean
  footerClassName?: string
  withHeader?: boolean
}

export const ContentLayout: FC<PropsWithChildren<ContentLayoutProps>> = ({
  children,
  withHeaderMobile = true,
  withHeader = true,
  withFooter = true,
  footerClassName = '',
}) => {
  return (
    <>
      {withHeader && <Header />}
      {withHeaderMobile && <HeaderMobile burgerMenuContent={<BurgerCallbackContent />} />}
      <main className='flex flex-col max-w-screen-main w-full min-h-mobile-content desktop:min-h-content mx-auto tablet:px-[60px]'>
        {children}
      </main>
      {withFooter && <Footer className={footerClassName} />}
    </>
  )
}
