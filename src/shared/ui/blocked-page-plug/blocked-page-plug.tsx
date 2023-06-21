import { FC } from 'react'
import { NextImage } from '@/shared/ui'
import clientErrorImage from '@/shared/assets/images/404-error-img.png'

export interface BlockedPagePlugProps {
  text: string
  extraContent?: JSX.Element
}

export const BlockedPagePlug: FC<BlockedPagePlugProps> = ({ text, extraContent }) => {
  return (
    <div className='max-w-[1440px] w-full text-center flex items-center justify-center flex-wrap gap-[60px] mt-[70px] text-black desktop:flex-row'>
      <div className='flex flex-col items-center gap-large max-w-[335px] desktop:max-w-[379px]'>
        <h1 className='croogla-title'>{text}</h1>
        {extraContent}
      </div>
      <NextImage width={560} height={467} src={clientErrorImage.src} />
    </div>
  )
}
