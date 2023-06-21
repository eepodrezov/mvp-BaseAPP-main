import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '@/shared/assets/logo-black.png'

export const IndexPlugView: FC = () => {
  const router = useRouter()
  function start() {
    router.push('/start')
  }
  setTimeout(start, 3000)
  return (
    <div className='w-full h-screen'>
      <Link  href='/start'>
        <img src={logo.src} alt="logo" />
      </Link>
    </div>
  )
}
