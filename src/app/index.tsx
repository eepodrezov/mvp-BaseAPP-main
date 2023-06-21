import React from 'react'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import NProgress from 'nprogress'
import { withProviders } from './providers'

import { AppPropsWithLayout } from '@/shared/@types'


NProgress.configure({ showSpinner: false })
dayjs.locale(ru)

const App = ({ Component, pageProps }: AppPropsWithLayout) => {

  const Layout = Component.Layout ?? (({ children }) => <>{children}</>)

  return (
    <div className='flex flex-col h-full min-h-screen'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default withProviders(App)
