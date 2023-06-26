import React from 'react'
import { Button } from '@/shared/ui'
import Link from 'next/link'

export const ToUiButton = () => {
  return (
    <Link href='/ui'>
        <Button>UI</Button>
    </Link>
  )
}
