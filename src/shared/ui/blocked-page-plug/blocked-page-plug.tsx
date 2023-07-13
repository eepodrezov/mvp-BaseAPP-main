import { FC } from 'react'
import { Button } from '@/shared/ui'
import CarPlugIcon from '@/shared/assets/icons/common/car-empty-plug.svg'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
export interface BlockedPagePlugProps {
  text: string
  extraContent?: JSX.Element
}

export const BlockedPagePlug: FC<BlockedPagePlugProps> = ({ text, extraContent }) => {
  const { t } = useTranslate(['common'])
  return (
    <div className='max-w-[1440px] w-full text-center flex-col flex items-center justify-center gap-large mt-[130px] text-black'>
      <CarPlugIcon width={119} height={93} />
      <div className={cn('flex flex-col items-center', { 'gap-5': extraContent })}>
        <h1 className='desktop:croogla-title croogla-sub-title'>{text}</h1>
        <p className='desktop:source-text source-mobile-text'>{extraContent}</p>
      </div>
      <Button href='/' variant='primary'>
        {t('Back to Catalogue')}
      </Button>
    </div>
  )
}
