import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui'
import UIIcon from '@/shared/assets/icons/ui.svg'

export const UIButton = () => {
    const router = useRouter()
    const isUI = router.pathname.includes('ui')
  return (
    <Link href={isUI ? '/start' : '/ui'}>
        <Button
            variant='icon'
          >
            {isUI ? 'App' : <UIIcon />}
          </Button>
    </Link>
  )
}
