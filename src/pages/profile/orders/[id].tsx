import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { useProtectRoute } from '@/features'
import { OrderPageView } from '@/views/profile-view'

const OrderPage: NextPageWithLayout = () => {
  useProtectRoute()
  return <OrderPageView />
}

OrderPage.Layout = ({ children }) => <ProfileLayout withMarginBottom={false}>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking', 'order'])),
    },
  }
}

export default OrderPage
