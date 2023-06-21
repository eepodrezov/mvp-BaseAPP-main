import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'

export type ColorOptionType = {
  id: number
  name: string
  hex: string
}

export interface ColorOptionProps {
  color: ColorOptionType
  isActive?: boolean
  onChange: (id: number) => void
}

export const ColorOption: FCWithClassName<ColorOptionProps> = ({ color, isActive, className, onChange }) => {
  return (
    <div
      className={cn('group flex items-center gap-base cursor-pointer w-fit', className)}
      onClick={() => onChange(color.id)}
    >
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 border border-border group-active:border-black rounded-full transition-colors',
          {
            '!border-black': isActive,
          }
        )}
        style={{ backgroundColor: color.hex }}
      />
      <span
        className={cn(
          'source-text text-text max-w-[130px] truncate group-hover:text-black group-hover:underline group-active:no-underline group-active:text-black transition-colors',
          {
            '!text-black': isActive,
          }
        )}
      >
        {color.name}
      </span>
    </div>
  )
}
