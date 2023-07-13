import { NextPageWithLayout } from '@/shared/@types'
import { ErrorPageView } from '@/views/error-page-view'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ContentLayout } from '@/layouts/content-layout'

const Error500Page: NextPageWithLayout = () => {
  return <ErrorPageView errorType='server' />
}

Error500Page.Layout = ({ children }) => <ContentLayout withFooter={false}>{children}</ContentLayout>

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Error500Page
