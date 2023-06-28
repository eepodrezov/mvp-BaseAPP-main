import { FC } from 'react'
import ProfileFillnessFullIcon from '@/shared/assets/icons/profile/profile-fullness-full.svg'
import ProfileFillnessEmptyIcon from '@/shared/assets/icons/profile/profile-fullness-empty.svg'
import { useAtomValue } from 'jotai'
import { profileFullnessAtom } from '../lib'
import cn from 'classnames'

export const ProfileBreadcrumbs = () => {
  const profileFullness = useAtomValue(profileFullnessAtom)
  return (
    <div
      className='flex justify-between items-center'
    >
        <ProfileFillnessEmptyIcon className='stroke-main w-[24px] h-[24px]'/>
        <div
          className='flex gap-1 w-[calc(100%-60px)]'
        >
          {Object.values(profileFullness.stages).map((stage, i) => (
            <BreadcrumbPart filled={profileFullness.currentStage > i} key={stage.stageDescription}/>
          ))}
        </div>
        <ProfileFillnessFullIcon className='stroke-main w-[24px] h-[24px]'/>
    </div>
  )
}

interface BreadcrumbPartProps {
  filled: boolean
}

const BreadcrumbPart:FC<BreadcrumbPartProps> = ({
  filled
}) => {
  return (
    <div
      className={cn('flex-1 h-[4px] bg-gray',{
        'bg-main': filled
      })}
    ></div>
  )
}
