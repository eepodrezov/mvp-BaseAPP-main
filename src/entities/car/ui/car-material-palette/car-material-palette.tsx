import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { ColorPalette } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionMaterials, useMaterialCollection } from '../../model'
import { FiltersApplyButton } from '@/features'

export const CarMaterialPalette: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])

  const { data } = useMaterialCollection()
  const [materials, setMaterials] = useAtom(carCollectionMaterials)

  if (!data?.items?.length) return null

  return (
    <FiltersApplyButton>
      <ColorPalette
        isMaterials
        name='material'
        withSelectAll
        className={className}
        colors={data?.items || []}
        selectedIds={materials}
        onChange={setMaterials}
        selectAllLabel={t('All Materials')}
      />
    </FiltersApplyButton>
  )
}
