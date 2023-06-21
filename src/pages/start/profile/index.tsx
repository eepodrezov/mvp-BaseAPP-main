import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { MainLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { ProfileView } from '@/views/start-page-views' 

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileView />
    </>
  )
}

ProfilePage.Layout = ({ children }) => <MainLayout>{children}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePage
