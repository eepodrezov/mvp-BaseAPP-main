import React from 'react'
import { InDevelopmentPlug } from '@/shared/ui/in-development-plug'
import { ProfileUserPanel } from '@/entities/viewer'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '@/entities/viewer'

export const ProfileView = () => {
  const viewer = useAtomValue(viewerAtom)
  if (!viewer) return <div>Loading...</div>
  return (
    <div 
      className='pt-[50px]'
    >
        <ProfileUserPanel />
        <InDevelopmentPlug />
    </div>
  )
}
