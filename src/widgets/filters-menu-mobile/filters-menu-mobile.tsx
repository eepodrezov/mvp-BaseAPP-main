import { FC } from 'react'
import { FiltersMobileModal } from '@/features/filters/ui/filters-mobile-modal'
import { FiltersFastHand } from '@/features/filters/ui/filters-fast-hand'
import {
  CarBrandSelect,
  carCollectionBrand,
  carCollectionPrice,
  carCollectionAge,
  CarPriceRange,
  CarAgeRange,
} from '@/entities/car'
import { useTranslate } from '@/shared/lib'

export const FiltersMenuMobile: FC = () => {
  const { t } = useTranslate(['car'])

  return (
    <div className='relative flex desktop:hidden items-center justify-between h-[63px] px-5 gap-2 border-b border-black'>
      <FiltersMobileModal />
      <div className='flex items-center gap-large'>
        {/* TODO: Сделать логику валют, когда будет мультивалютность */}
        <FiltersFastHand label={`${t('Price')} ₽`} atom={carCollectionPrice}>
          <CarPriceRange />
        </FiltersFastHand>
        <FiltersFastHand label={t('Age')} atom={carCollectionAge}>
          <CarAgeRange />
        </FiltersFastHand>
        <FiltersFastHand label={t('brand')} atom={carCollectionBrand}>
          <CarBrandSelect />
        </FiltersFastHand>
      </div>
    </div>
  )
}
