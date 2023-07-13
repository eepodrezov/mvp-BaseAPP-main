import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { OrdersTab } from '@/views/profile-view'

const ProfilePageOrders: NextPageWithLayout = () => {
  useProtectRoute()
  return (
    <>
      <Head>
        <title>Profile Orders</title>
      </Head>
      <OrdersTab />
    </>
  )
}

ProfilePageOrders.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking', 'order'])),
    },
  }
}

export default ProfilePageOrders
