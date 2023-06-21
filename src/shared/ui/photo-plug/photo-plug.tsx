import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'

export interface PhotoPlugProps {
  width?: string | number
  height?: string | number
}

export const PhotoPlug: FCWithClassName<PhotoPlugProps> = ({ width, height, className }) => {
  const { t } = useTranslate(['common'])
  return (
    <div
      data-testid='image-no-photo'
      className={cn('flex items-center justify-center bg-gray croogla-text text-text rounded-large', className)}
      // Из-за JIT компилятора не получится всунуть в cn через tailwind
      style={{ width: width || '100%', height: height || '100%' }}
    >
      {t('noPhoto')}
    </div>
  )
}
