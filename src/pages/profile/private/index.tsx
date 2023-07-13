import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { PrivateTab } from '@/views/profile-view'

const ProfilePagePrivate: NextPageWithLayout = () => {
  useProtectRoute()
  return (
    <>
      <Head>
        <title>Profile Private</title>
      </Head>
      <PrivateTab />
    </>
  )
}

ProfilePagePrivate.Layout = ({ children }) => <ProfileLayout withMarginBottom={false}>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePagePrivate
