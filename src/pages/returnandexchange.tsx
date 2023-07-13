import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ContentLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { ReturnAndExchangeInfoView } from '@/views'

const Returnandexchange: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Return and Exchange</title>
    </Head>
    <ReturnAndExchangeInfoView />
  </>
)

Returnandexchange.Layout = ({ children }) => <ContentLayout withHeaderMobile={false}>{children}</ContentLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'return-and-exchange'])),
    },
  }
}

export default Returnandexchange
