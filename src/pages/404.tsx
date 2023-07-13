import { NextPageWithLayout } from '@/shared/@types'
import { ErrorPageView } from '@/views/error-page-view'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ContentLayout } from '@/layouts/content-layout'

const Error404Page: NextPageWithLayout = () => {
  return <ErrorPageView errorType='client' />
}

Error404Page.Layout = ({ children }) => <ContentLayout withFooter={false}>{children}</ContentLayout>

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Error404Page
