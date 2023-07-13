import React, { FC, useEffect } from 'react'
import CloseIcon from '@/shared/assets/icons/common/close.svg'
import { FavoriteButton, ShareButton } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'
import { PROFILE_URL } from '@/entities/viewer'
export interface CarPageMobileHeaderProps {
  isFavorite?: boolean
  onFavorite?: () => void
}

export const CarPageMobileHeader: FC<CarPageMobileHeaderProps> = ({ isFavorite, onFavorite }) => {
  const router = useRouter()
  function onClose() {
    // TODO сделать проверку на наличие предыдущей страницы
    router.back()
  }
  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url.split('?')[1] || url.includes(PROFILE_URL)) return true
      router.push('/')
      return false
    })
    return () => {
      router.beforePopState
    }
  }, [onClose])

  return (
    <div className='min-[1280px]:hidden p-5 flex items-center justify-between border-b border-black'>
      <Button variant='icon' onClick={() => onClose()}>
        <CloseIcon className='stroke-black w-10 h-10' />
      </Button>
      <div className='flex gap-small items-center'>
        <FavoriteButton isFavorite={isFavorite} isSmallIcon onClick={onFavorite} />
        <ShareButton withText={false} />
      </div>
    </div>
  )
}
