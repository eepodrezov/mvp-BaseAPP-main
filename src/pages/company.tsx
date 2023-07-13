import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ContentLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { CompanyInfoView } from '@/views'

const Company: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Company</title>
    </Head>
    <CompanyInfoView />
  </>
)

Company.Layout = ({ children }) => <ContentLayout withHeaderMobile={false}>{children}</ContentLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'company'])),
    },
  }
}

export default Company
