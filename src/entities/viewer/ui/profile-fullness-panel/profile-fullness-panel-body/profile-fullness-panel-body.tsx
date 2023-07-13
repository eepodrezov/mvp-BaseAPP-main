import { FC, useEffect, useState } from 'react'
import SuccessIcon from '@/shared/assets/icons/profile/success-icon.svg'
import { useAtomValue } from 'jotai'
import { profileFullnessAtom } from '../lib'
import cn from 'classnames'

export const ProfileFullnessPanelBody = () => {
    const profileFullness = useAtomValue(profileFullnessAtom)
    const [isInputContentShow, setIsInputContentShow] = useState(false)
    useEffect(() => {
        if (!isInputContentShow) {
            setTimeout(() => {
                setIsInputContentShow(true)
              }, 1000)
        }
    },[])
  return (
    <div
        className="p-5 flex flex-col gap-5"
    >
        {Object.values(profileFullness.stages).map((stage,i) => (
            <ProfileFullnessPanelBodyElem 
                key={stage.stageDescription}
                stageBio={stage.stageDescription}
                isChecked={profileFullness.currentStage > i}
                stageInputContent={stage.stageInputContent}
                isInputContent={isInputContentShow && profileFullness.currentStage === i}
            />
        ))}
    </div>
  )
}

interface ProfileFullnessPanelBodyElemProps {
    stageBio: string
    isChecked: boolean
    stageInputContent?: JSX.Element
    isInputContent?:boolean
}

const ProfileFullnessPanelBodyElem:FC<ProfileFullnessPanelBodyElemProps> = ({
    stageBio,
    isChecked, 
    stageInputContent,
    isInputContent
}) => {
    return (
        <div
            className="flex flex-col gap-5"
        >
            <div
                className={cn('flex gap-5', {
                    'text-primary': isChecked
                })}
            >
                <SuccessIcon 
                    className={cn({
                        'stroke-black': isChecked,
                        'border-black border rounded-full': !isChecked
                    })}
                />
                {stageBio}
            </div>
            {isInputContent && stageInputContent}
        </div>
    )
}
