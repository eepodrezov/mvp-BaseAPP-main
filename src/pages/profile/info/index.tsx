import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { InDevelopmentPlug } from '@/shared/ui'

const ProfilePageInfo: NextPageWithLayout = () => {
  useProtectRoute()
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <InDevelopmentPlug />
    </>
  )
}

ProfilePageInfo.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePageInfo
