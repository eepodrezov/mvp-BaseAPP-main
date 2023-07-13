import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { ColorPalette } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionInteriorColors, useColorInteriorCollection } from '../../model'
import { FiltersApplyButton } from '@/features'

export const CarInteriorColorPalette: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])

  const { data } = useColorInteriorCollection()
  const [interiorColors, setInteriorColors] = useAtom(carCollectionInteriorColors)

  if (!data?.items?.length) return null

  return (
    <FiltersApplyButton>
      <ColorPalette
        name='color-intrerior'
        withSelectAll
        className={className}
        colors={data?.items || []}
        selectedIds={interiorColors}
        onChange={setInteriorColors}
        selectAllLabel={t('All Interior Colors')}
      />
    </FiltersApplyButton>
  )
}
