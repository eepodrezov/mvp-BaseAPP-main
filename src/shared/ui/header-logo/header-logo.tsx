import React from 'react'
import logo from '@/shared/assets/images/header-logo.png'
import { FC } from '@/shared/@types'

export const HeaderLogo:FC = () => {
  return (
    <h2
        className='flex gap-2 items-center '
    >
        <img src={logo.src} alt="logo" />
        MPV BaseAPP
    </h2>
  )
}
