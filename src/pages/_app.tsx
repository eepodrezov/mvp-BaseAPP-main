import Head from 'next/head'
import { API_MOCKING } from '@/shared/config'
import App from '@/app'
//Next.js требует импортировать глобальные стили только в _app.tsx
import '@/app/index.css'
import { AppPropsWithLayout } from '@/shared/@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getTokens } from '@/shared/lib'
import { setCookie } from 'nookies'
import Script from 'next/script'

if (API_MOCKING === 'enabled') {
  require('@/app/mocks-server')
}

const _App = (props: AppPropsWithLayout) => {
  const router = useRouter()
  const newFingerprint = router?.query?._fp
  const { fingerprint } = getTokens()
  useEffect(() => {
    if (!fingerprint && newFingerprint) {
      setCookie(null, 'fingerprint', newFingerprint as string)
    }
  }, [newFingerprint, fingerprint])
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
        />
        <meta name='HandheldFriendly' content='true' />
        <meta name='robots' content='noindex,nofollow' />
        <meta name='googlebot' content='noindex,nofollow' />
        <meta name='google' content='nositelinkssearchbox' />
        <meta name='google' content='notranslate' />
        <meta name='yandex' content='none' />
      </Head>
      <Script type='module' src='https://widget.referral.dev2.webant.ru/assets/widget.js'></Script>
      <App {...props} />
    </>
  )
}

// This disables the ability to perform automatic static optimization,
// causing every page in your app to be server-side rendered.
// Если не нужно подтягивать одинаковые данные для каждой страницы, то метод стоит убрать
// _App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return {
//     ...appProps,
//   }
// }

export default _App
