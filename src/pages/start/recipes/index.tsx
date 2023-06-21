import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { RecipesView } from '@/views/start-page-views' 

const RecipesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <RecipesView />
    </>
  )
}

RecipesPage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default RecipesPage

