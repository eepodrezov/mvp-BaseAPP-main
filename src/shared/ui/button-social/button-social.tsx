import { FC } from 'react'
import Instagram from '@/shared/assets/icons/common/instagram.svg'
import Facebook from '@/shared/assets/icons/common/facebook.svg'
import Twitter from '@/shared/assets/icons/common/twitter.svg'
import Linkedin from '@/shared/assets/icons/common/linkedin.svg'
import { OptionalLinkWrapper } from '@/shared/lib'

export type ButtonSocialType = 'instagram' | 'facebook' | 'twitter' | 'linkedin'

export interface ButtonSocialProps {
  type: ButtonSocialType
  link: string
  disabled?: boolean
}

export const ButtonSocial: FC<ButtonSocialProps> = ({ type, link, disabled }) => {
  const SocialButtonData = (() => {
    switch (type) {
      case 'facebook':
        return Facebook
      case 'instagram':
        return Instagram
      case 'linkedin':
        return Linkedin
      case 'twitter':
        return Twitter
    }
  })()
  return (
    <OptionalLinkWrapper href={link} newTab>
      <button
        disabled={disabled}
        className='transition-colors fill-border hover:fill-red active:fill-text disabled:fill-disabled'
      >
        <SocialButtonData />
      </button>
    </OptionalLinkWrapper>
  )
}
