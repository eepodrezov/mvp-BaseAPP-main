import { FCWithClassName, Nullable } from '@/shared/@types'
import { Switch } from '../switch'
import { ColorOption } from './color-option'
import cn from 'classnames'
import { Button } from '../button'
import { useTranslate } from '@/shared/lib'
import { Color } from '@/entities/car'
import { UNDEFINED_TYPE_COLOR } from '@/shared/config'

export interface ColorPaletteProps {
  name: string
  colors: Omit<Color, 'models' | 'cars' | 'type'>[]
  withSelectAll?: boolean
  isMaterials?: boolean
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
  isMaterials,
}) => {
  const { t } = useTranslate(['common'])
  const isAllSelected = selectedIds?.length === colors.length

  const onColorSelect = (id: number) => {
    if (selectedIds?.includes(id)) {
      return onChange(selectedIds.filter(selectedId => selectedId !== id))
    }
    onChange([...(selectedIds || []), id])
  }

  const colorsArr = (JSON.parse(JSON.stringify(colors)) as Color[]).sort((a, b) => {
    if (a?.name === UNDEFINED_TYPE_COLOR) {
      return 1
    }
    if (b?.name === UNDEFINED_TYPE_COLOR) {
      return -1
    }
    return 0
  })

  return (
    <div data-testid='color-palette' className={cn('flex flex-col gap-base', className)}>
      {withSelectAll && (
        <Switch
          label={selectAllLabel}
          value={isAllSelected}
          name='selectAllColors'
          wrapperClassName='justify-between'
          onChange={checked => (checked ? onChange(colorsArr.map(color => color.id)) : onChange([]))}
        />
      )}
      <div className='columns-2 gap-5'>
        {colorsArr.map(color => (
          <ColorOption
            isMaterials={isMaterials}
            key={color.id}
            color={color}
            onChange={onColorSelect}
            isActive={selectedIds?.includes(color.id)}
            className='break-inside-avoid mb-small'
          />
        ))}
      </div>
      <Button
        data-testid='reset-colors-option'
        variant='text'
        disabled={!selectedIds?.length}
        onClick={() => onChange([])}
        className='self-end'
      >
        {t('Reset all')}
      </Button>
    </div>
  )
}
