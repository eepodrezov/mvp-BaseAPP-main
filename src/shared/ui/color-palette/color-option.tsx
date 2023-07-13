import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'
import { NextImage } from '../next-image'
import UndefinedColor from '@/shared/assets/icons/common/reset-palette.svg'
import { Color } from '@/entities/car'
import { useTranslate } from '@/shared/lib'
import { TrancateContainer } from '../truncate-container'

export interface ColorOptionProps {
  color: Omit<Color, 'models' | 'cars' | 'type'>
  isActive?: boolean
  isMaterials?: boolean
  onChange: (id: number) => void
}

export const ColorOption: FCWithClassName<ColorOptionProps> = ({
  color,
  isActive,
  className,
  onChange,
  isMaterials,
}) => {
  const { t } = useTranslate(['car'])

  return (
    <div
      data-testid='color-option'
      className={cn('group flex items-center gap-base cursor-pointer w-fit', className)}
      onClick={() => onChange(color.id)}
    >
      <div
        className={cn('flex justify-center items-center flex-shrink-0 w-10 h-10 transition-colors', {
          'border border-border group-active:border-black overflow-hidden rounded-full':
            !isMaterials || color?.name === 'Undefined',
          '!border-black': isActive,
        })}
        style={{ backgroundColor: color?.hex?.startsWith('#') ? color?.hex : '#' + color?.hex }}
      >
        {(color?.assetPath || color?.icon?.pathS3) && (
          <NextImage
            width={40}
            height={40}
            src={isMaterials ? color?.icon?.pathS3 : color?.assetPath}
            className={cn({
              'rounded-full': !isMaterials,
              'opacity-50': !isActive && isMaterials,
            })}
          />
        )}
        {color?.name === 'Undefined' && (
          <UndefinedColor
            className={cn(' flex-shrink-0 transition-colors', {
              '!stroke-black': isActive,
              '!stroke-border': !isActive,
            })}
          />
        )}
      </div>
      <TrancateContainer
        childrenClassName={cn(
          'source-text text-text group-hover:text-black group-hover:underline group-active:no-underline group-active:text-black transition-colors',
          {
            '!text-black': isActive,
          }
        )}
        maxWidth={120}
      >
        {t(color?.name)}
      </TrancateContainer>
    </div>
  )
}
