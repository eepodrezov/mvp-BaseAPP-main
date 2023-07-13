import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ContentLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { InDevelopmentPlug } from '@/shared/ui'

const Contacts: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Contacts</title>
    </Head>
    <InDevelopmentPlug />
  </>
)

Contacts.Layout = ({ children }) => <ContentLayout>{children}</ContentLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Contacts
