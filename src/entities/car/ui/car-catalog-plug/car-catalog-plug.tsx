import { FC } from 'react'
import CarPlugIcon from '@/shared/assets/icons/common/car-empty-plug.svg'
import { useTranslate } from '@/shared/lib'
export interface CarCatalogPlugProps {
  notFoundText?: string
}

export const CarCatalogPlug: FC<CarCatalogPlugProps> = ({ notFoundText }) => {
  const { t } = useTranslate(['car'])

  return (
    <div className='w-full flex flex-col items-center justify-start gap-large pt-10 desktop:pt-[140px]'>
      <CarPlugIcon width={120} height={93} />
      <p className='croogla-modile text-text desktop:croogla-title select-none text-center'>
        {notFoundText || t('No cars upon request')}
      </p>
    </div>
  )
}
