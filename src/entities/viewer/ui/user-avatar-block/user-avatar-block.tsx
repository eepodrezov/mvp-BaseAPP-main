import React from 'react'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '../../model'

export const UserAvatarBlock = () => {
    const viewer = useAtomValue(viewerAtom)
  return (
    <div 
    >
        <img 
            src={viewer?.avatar?.[0].href} alt='avatar'
            className='w-[80px] h-[80px] rounded-full'
        />
    </div>
  )
}
