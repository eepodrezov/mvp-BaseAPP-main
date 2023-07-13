import { GetServerSidePropsContext } from 'next'

const ProfilePage = () => <></>

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const destination = locale === 'ru' ? `/${locale}/profile/private` : '/profile/private'
  return {
    redirect: {
      permanent: false,
      destination,
    },
  }
}

export default ProfilePage
