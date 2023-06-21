import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { UiView } from '@/views' 

const UiPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div 
        className='h-screen'
      >
        <UiView />
      </div>
    </>
  )
}

UiPage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default UiPage
