import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui'

export const UIButton = () => {
    const router = useRouter()
    const isUI = router.pathname.includes('ui')
  return (
    <Link href={isUI ? '/start' : '/ui'}>
      <div
        className='z-10 absolute top-2 right-12 bg-white w-[58px] h-[58px] rounded-xl flex items-center justify-center text-xl'
      >
        <Button
            style={{ boxShadow: '10px 10px 30px #5c5757' }}
          >
            {isUI ? 'App' : 'UI'}
          </Button>

      </div>
    </Link>
  )
}
