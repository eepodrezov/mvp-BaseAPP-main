import { FCWithClassName, Nullable } from '@/shared/@types'
import { Switch } from '../switch'
import { ColorOption, ColorOptionType } from './color-option'
import { ResetColorsOption } from './reset-colors-option'
import cn from 'classnames'

export interface ColorPaletteProps {
  colors: ColorOptionType[]
  withSelectAll?: boolean
  selectAllLabel?: string
  selectedIds: Nullable<number[]>
  onChange: (ids: number[]) => void
}

export const ColorPalette: FCWithClassName<ColorPaletteProps> = ({
  colors,
  className,
  selectedIds,
  withSelectAll,
  selectAllLabel,
  onChange,
}) => {
  const isAllSelected = selectedIds?.length === colors.length

  const onColorSelect = (id: number) => {
    if (selectedIds?.includes(id)) {
      return onChange(selectedIds.filter(selectedId => selectedId !== id))
    }
    onChange([...(selectedIds || []), id])
  }

  return (
    <div data-testid='color-palette' className={cn('flex flex-col gap-base', className)}>
      {withSelectAll && (
        <Switch
          label={selectAllLabel}
          value={isAllSelected}
          name='selectAllColors'
          wrapperClassName='justify-between'
          onChange={checked => (checked ? onChange(colors.map(color => color.id)) : onChange([]))}
        />
      )}
      <div className='columns-2 gap-5'>
        {colors.map(color => (
          <ColorOption
            key={color.id}
            color={color}
            onChange={onColorSelect}
            isActive={selectedIds?.includes(color.id)}
            className='break-inside-avoid mb-small'
          />
        ))}
        {!!selectedIds?.length && <ResetColorsOption onChange={() => onChange([])} />}
      </div>
    </div>
  )
}
