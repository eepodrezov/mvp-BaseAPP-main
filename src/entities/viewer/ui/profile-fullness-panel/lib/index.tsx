import { atom } from 'jotai'
import { Input } from '@/shared/ui'

export type FillMethodType = (content: string | Post | undefined) => void

export type Post = {
    header: string
    images: string[]
    description: string
}

export type ProfileFullnessType = {
    currentStage: 1|2|3|4
    stagesCount: number
    stages :{
        firstStage:{ 
            fillMethod: FillMethodType
            stageDescription: string
            telegram?: string
            stageInputContent: JSX.Element
        }
        secondStage:{
            fillMethod: () => void
            stageDescription: string
            photoUrl?: string
            stageInputContent: JSX.Element
        }
        theirdStage:{
            fillMethod: FillMethodType
            stageDescription: string
            bio?: string
            stageInputContent: JSX.Element
        }
        fourthStage:{
            fillMethod: FillMethodType
            stageDescription: string
            postId?: number
            stageInputContent: JSX.Element
        }
    }
}

export const profileFullnessAtom = atom<ProfileFullnessType>({
    // @ts-expect-error
    currentStage: 2,
    stagesCount: 4,
    stages: {
        firstStage:{ 
            fillMethod: (telegramUrl: string) => alert(telegramUrl),
            stageDescription: 'Add profile info',
            telegram: undefined,
            stageInputContent: <div>telegramInput</div>
        },
        secondStage:{
            fillMethod: () => alert('photo added'),
            stageDescription: 'Add profile photo',
            photoUrl: 'https://sun9-50.userapi.com/impg/nw43iXslqRtELGXhSuEyZP0u_WE-bl4RL3GBeg/PXFMMSw5iCc.jpg?size=960x1280&quality=95&sign=d6726b24dd385f765b57ea7240bb9754&type=album',
            stageInputContent: <div>photoInput</div>
        },
        theirdStage:{
            fillMethod: (bio: string) => alert(bio),
            stageDescription: 'Write your profile bio',
            bio: undefined,
            stageInputContent: <Input placeholder='Tell us more about yourself &#129392;'/>
        },
        fourthStage:{
            fillMethod: () => alert('post added'),
            stageDescription: 'Add first post',
            postId: undefined,
            stageInputContent: <div>postInput</div>
        }
    }
})
