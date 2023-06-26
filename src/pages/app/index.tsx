import { GetServerSidePropsContext } from 'next'

const AppPage = () => <></>

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const destination = locale === 'ru' ? `/${locale}/app/profile` : '/app/profile'
  return {
    redirect: {
      permanent: false,
      destination,
    },
  }
}

export default AppPage
