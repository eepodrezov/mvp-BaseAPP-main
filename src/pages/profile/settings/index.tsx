import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { SettingsTab } from '@/views/profile-view'

const ProfilePageSettings: NextPageWithLayout = () => {
  useProtectRoute()
  return (
    <>
      <Head>
        <title>Profile Settings</title>
      </Head>
      <SettingsTab />
    </>
  )
}

ProfilePageSettings.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePageSettings
