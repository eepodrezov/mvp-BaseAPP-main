import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { CatalogView } from '@/views/start-page-views' 

const CatalogPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <CatalogView />
    </>
  )
}

CatalogPage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default CatalogPage
