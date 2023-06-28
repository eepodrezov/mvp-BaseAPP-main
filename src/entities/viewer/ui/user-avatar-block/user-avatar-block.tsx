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
            className='w-[100px] h-[100px] rounded-full'
        />
    </div>
  )
}
