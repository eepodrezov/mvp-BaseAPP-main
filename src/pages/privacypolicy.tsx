import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ContentLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { InDevelopmentPlug } from '@/shared/ui'

const Privacypolicy: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Privacy Policy</title>
    </Head>
    <InDevelopmentPlug />
  </>
)

Privacypolicy.Layout = ({ children }) => <ContentLayout>{children}</ContentLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Privacypolicy
