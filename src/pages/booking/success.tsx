import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ContentLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useTranslate } from '@/shared/lib'
import { SuccessBookingView } from '@/views/booking-view'

const SuccessBooking: NextPageWithLayout = () => {
  const { t } = useTranslate(['booking'])
  return (
    <>
      <Head>
        <title>{t('Booking_prepayment_was_successful')}</title>
      </Head>
      <SuccessBookingView />
    </>
  )
}

SuccessBooking.Layout = ({ children }) => <ContentLayout withFooter={false}>{children}</ContentLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['booking', 'common'])),
    },
  }
}

export default SuccessBooking
