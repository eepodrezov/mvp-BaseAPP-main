import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '@/shared/assets/logo.svg'

export const IndexPlugView: FC = () => {
  const router = useRouter()
  function start() {
    router.push('/start')
  }
  setTimeout(start, 3000)
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col bg-logo'>
      <Logo className='w-[100px]'/>
      <Link  href='/start'>
        <p className='croogla-title'>eDa</p>
      </Link>
    </div>
  )
}
