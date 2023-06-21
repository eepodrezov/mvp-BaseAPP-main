import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { BasketView } from '@/views/start-page-views' 

const BasketPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Basket</title>
      </Head>
      <BasketView />
    </>
  )
}

BasketPage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default BasketPage
