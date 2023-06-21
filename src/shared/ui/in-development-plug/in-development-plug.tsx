import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'
import InDevelopmentPlugIcon from '@/shared/assets/icons/common/in-development-plug.svg'

export interface InDevelopmentPlugProps {
  width?: string | number
  height?: string | number
}

export const InDevelopmentPlug: FCWithClassName<InDevelopmentPlugProps> = ({ width, height, className }) => {
  const { t } = useTranslate(['common'])
  return (
    <div
      data-testid='image-no-photo'
      className={cn('flex items-center justify-center croogla-text text-text rounded-large', className)}
      // Из-за JIT компилятора не получится всунуть в cn через tailwind
      style={{ width: width || '100%', height: height || '100%' }}
    >
      <p className='w-[276px] flex flex-col gap-5 items-center'>
        <InDevelopmentPlugIcon className='mb-small stroke-black' />
        <div className='croogla-title text-black'>{t('In development')}</div>
        <div className='source-text text-center'>{t('Section is not working yet, but we will fix it soon')}</div>
      </p>
    </div>
  )
}
