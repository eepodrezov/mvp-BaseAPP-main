import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { FavoritesTab } from '@/views/profile-view'

const ProfilePageFavorites: NextPageWithLayout = () => {
  useProtectRoute()
  return (
    <>
      <Head>
        <title>Profile Favorites</title>
      </Head>
      <FavoritesTab />
    </>
  )
}

ProfilePageFavorites.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePageFavorites
