import Head from 'next/head'
import { API_MOCKING } from '@/shared/config'
import { AppPropsWithLayout } from '@/shared/@types'
import App from '@/app'
//Next.js требует импортировать глобальные стили только в _app.tsx
import '@/app/index.css'
import { useWindowDimensions } from '@/shared/hooks'
import { DesktopPlug } from '@/shared/ui/desktop-plug'
import Joyride from 'react-joyride'

if (API_MOCKING === 'enabled') {
  require('@/app/mocks-server')
}

const _App = (props: AppPropsWithLayout) => {
  const { isMobile } = useWindowDimensions()
  if (!isMobile) return <DesktopPlug />
  const STEPS = [
    {
      target: '#app',
      content: 'This is the App',
    },
    {
      target: '#ui',
      content: 'This is UI',
    },
  ]
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <App {...props} />
      <Joyride
          steps={STEPS}
      />
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
