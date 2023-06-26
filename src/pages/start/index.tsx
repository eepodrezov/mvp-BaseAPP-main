import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Button } from '@/shared/ui'

const StartPage: NextPageWithLayout = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
      <Link href='/app'>
        <Button>App</Button>
      </Link>
      <Link href='/ui'>
        <Button>UI</Button>
      </Link>
    </div>
  )
}

StartPage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default StartPage
