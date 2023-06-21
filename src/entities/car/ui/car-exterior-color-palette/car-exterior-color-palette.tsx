import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { ColorPalette } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionExteriorColors, useColorExteriorCollection } from '../../model'

export const CarExteriorColorPalette: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])

  const { data } = useColorExteriorCollection()
  const [exteriorColors, setExteriorColors] = useAtom(carCollectionExteriorColors)

  if (!data?.items?.length) return null

  return (
    <ColorPalette
      withSelectAll
      className={className}
      colors={data?.items || []}
      selectedIds={exteriorColors}
      onChange={setExteriorColors}
      selectAllLabel={t('All Exterior Colors')}
    />
  )
}
