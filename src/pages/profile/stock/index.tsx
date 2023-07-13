import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { StockTab } from '@/views/profile-view'
import { useRouter } from 'next/router'
import { viewerAtom, ROLE_DEALER, PROFILE_URL } from '@/entities/viewer'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

const ProfilePageStock: NextPageWithLayout = () => {
  useProtectRoute()

  const router = useRouter()

  const viewer = useAtomValue(viewerAtom)

  useEffect(() => {
    if (viewer && !viewer?.roles.includes(ROLE_DEALER)) router.push(PROFILE_URL)
  }, [viewer])

  return (
    <>
      <Head>
        <title>Profile Stock</title>
      </Head>
      <StockTab />
    </>
  )
}

ProfilePageStock.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePageStock
