import React from 'react'
import { UserAvatarBlock } from '../user-avatar-block'
import { useAtomValue } from 'jotai'
import { viewerAtom } from '../../model'
import { User } from '../../lib'
import { Button } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'

export const ProfileUserPanel = () => {
    const viewer = useAtomValue(viewerAtom)
    const { firstName, lastName, telegram } = viewer as User
    const { t } = useTranslate([])
  return (
    <div
        className='flex gap-3'
    >
        <UserAvatarBlock />
        <div>
            <h1>{`${firstName} ${lastName}`}</h1>
            <div className='p2 mb-3'>{`@${telegram}`}</div>
            <Button className='rounded-none px-20' variant='secondary'>{t('Find Friends')}</Button>
        </div>
    </div>
  )
}
