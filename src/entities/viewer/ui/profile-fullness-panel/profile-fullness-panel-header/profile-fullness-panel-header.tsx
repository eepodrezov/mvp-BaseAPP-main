import { FC } from 'react'
import { useAtomValue } from 'jotai'
import { profileFullnessAtom } from '../lib'
import { useTranslate } from '@/shared/lib'
import Arrow from '@/shared/assets/icons/profile-dropdown-arrow.svg'
import cn from 'classnames'
import { ProfileBreadcrumbs } from './profile-breadcrumbs'


export interface ProfileFullnessPanelHeaderProps {
    open:boolean
}

export const ProfileFullnessPanelHeader:FC<ProfileFullnessPanelHeaderProps> = ({
    open
}) => {
    const { t }  = useTranslate([])
    const { currentStage, stagesCount } = useAtomValue(profileFullnessAtom)
  return (
    <div
        className='cursor-pointer'
    >
        <div
            className="p2 flex justify-between items-center mb-5"
        >
            {`${t('Complete your profile')} (${currentStage}/${stagesCount})`}
            <Arrow 
                className={cn('stroke-black transition-all', {
                    'rotate-90 transition-all': open
                })}
            />
        </div>
        <ProfileBreadcrumbs />
    </div>
  )
}
