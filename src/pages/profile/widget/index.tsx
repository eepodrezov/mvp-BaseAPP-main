import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import { ProfileLayout } from '@/layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useProtectRoute } from '@/features'
import { useEffect } from 'react'
import { useReferalToken } from '@/entities/widget/model/referal-token-query'

const ProfilePageWidget: NextPageWithLayout = () => {
  useProtectRoute()

  const { data } = useReferalToken()

  useEffect(() => {
    if (data?.token) {
      //@ts-expect-error
      window.referralWidget?.init({
        height: '1000px',
        jwt: data.token,
        containerId: 'rootReferral',
      })
    }
  }, [data?.token])

  return (
    <>
      <Head>
        <title>Widget</title>
      </Head>
      <div id='rootReferral' className='w-[calc(100vw - 300px)] h-screen'></div>
    </>
  )
}

ProfilePageWidget.Layout = ({ children }) => <ProfileLayout>{children}</ProfileLayout>

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'profile', 'car', 'booking'])),
    },
  }
}

export default ProfilePageWidget
