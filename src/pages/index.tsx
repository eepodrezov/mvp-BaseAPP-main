import Head from 'next/head'
import { IndexPlugView } from '@/views/index-plug-view'
import { NextPageWithLayout } from '@/shared/@types'

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>eDa</title>
    </Head>
    <IndexPlugView />
  </>
)

export default Home
