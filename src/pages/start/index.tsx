import { Button } from '@/shared/ui'
import Link from 'next/link'

const StartPage = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
      <Link href='/app'>
        <Button>App</Button>
      </Link>
      <Link href='/ui'>
        <Button>UI</Button>
      </Link>
    </div>
  )
}

export default StartPage
