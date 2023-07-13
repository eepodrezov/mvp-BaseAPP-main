import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '@/shared/@types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ContentLayout } from '@/layouts/content-layout'

const BookingView = dynamic(() => import('@/views/booking-view'), { ssr: false })

const BookingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Booking</title>
      </Head>
      <BookingView />
    </>
  )
}

BookingPage.Layout = ({ children }) => (
  <ContentLayout withHeaderMobile={false} footerClassName='hidden desktop:inline'>
    {children}
  </ContentLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'booking', 'car', 'delivery'])),
    },
  }
}

export default BookingPage
