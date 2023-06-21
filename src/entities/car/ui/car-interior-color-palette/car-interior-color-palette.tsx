import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { ColorPalette } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionInteriorColors, useColorInteriorCollection } from '../../model'

export const CarInteriorColorPalette: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])

  const { data } = useColorInteriorCollection()
  const [interiorColors, setInteriorColors] = useAtom(carCollectionInteriorColors)

  if (!data?.items?.length) return null

  return (
    <ColorPalette
      withSelectAll
      className={className}
      colors={data?.items || []}
      selectedIds={interiorColors}
      onChange={setInteriorColors}
      selectAllLabel={t('All Interior Color')}
    />
  )
}
