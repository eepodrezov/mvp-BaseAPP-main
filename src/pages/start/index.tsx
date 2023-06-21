import { GetServerSidePropsContext } from 'next'

const StartPage = () => <></>

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const destination = locale === 'ru' ? `/${locale}/start/recipes` : '/start/recipes'
  return {
    redirect: {
      permanent: false,
      destination,
    },
  }
}

export default StartPage
