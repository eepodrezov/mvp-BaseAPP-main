import { FC, SVGProps } from 'react'
import { OverviewItem, OverviewItemType } from '@/shared/ui'
import {
  BodyTypeIcon,
  DriveType,
  FuelTypeIcon,
  TransmitionTypeIcon,
  ExteriorColorIcon,
  InteriorColorIcon,
  EngineIcon,
  ClassIcon,
} from '@/shared/assets/icons/car-overview'
import { FCWithClassName, TFunction } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import {
  CAR_TYPE_FUEL_CONSTANTS_KEYS,
  CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS,
  CAR_TYPE_DRIVE_CONSTANTS_KEYS,
  Color,
  Car,
} from '@/entities/car'
import { getCarColorText } from '@/entities/car'
import cn from 'classnames'

export interface CarOverviewProps {
  car: Car
}

type OverviewItemsType = {
  label: OverviewItemType
  icon: FC<SVGProps<SVGSVGElement>>
  elementKeys: string[] | string
}

const overviewElements = [
  { label: 'class', icon: ClassIcon, elementKeys: null },
  { label: 'bodyType', icon: BodyTypeIcon, elementKeys: null },
  { label: 'engine', icon: EngineIcon, elementKeys: 'engine' },
  { label: 'driveType', icon: DriveType, elementKeys: CAR_TYPE_DRIVE_CONSTANTS_KEYS },
  { label: 'fuelType', icon: FuelTypeIcon, elementKeys: CAR_TYPE_FUEL_CONSTANTS_KEYS },
  { label: 'transmissionType', icon: TransmitionTypeIcon, elementKeys: CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS },
  { label: 'exteriorColors', icon: ExteriorColorIcon },
  { label: 'interiorColors', icon: InteriorColorIcon },
] as OverviewItemsType[]

export const CarOverview: FCWithClassName<CarOverviewProps> = ({ car, className }) => {
  const { t } = useTranslate(['car'])

  function getOverviewText(label: string, elementKeys: string[] | string, t: TFunction) {
    const carFieldValue = car[label as keyof Car]
    if (label === 'exteriorColors') return getCarColorText(car.colors?.filter(color => color.type === 1) as Color[])
    if (label === 'interiorColors') return getCarColorText(car.colors?.filter(color => color.type === 0) as Color[])
    if (label === 'bodyType') return car?.bodyType?.name
    if (elementKeys === 'engine') return String(car?.literEngineVolume) + ` ${t('L')}`
    if (typeof carFieldValue === 'string') return carFieldValue
    return t(elementKeys?.[carFieldValue as number])
  }

  return (
    <div className={cn('p-5', className)}>
      <div className='croogla-mobile desktop:croogla-sub-title pb-5 desktop:pb-10 '>{t('Vehicle Overview')}</div>
      <div className='grid grid-cols-2 gap-5 desktop:grid-cols-3 desktop:gap-10 tablet:desktop:grid-cols-4'>
        {overviewElements.map((overviewElement, index) => (
          <OverviewItem
            key={overviewElement.label + index}
            type={t(overviewElement.label)}
            text={getOverviewText(overviewElement.label, overviewElement.elementKeys, t)}
            Icon={overviewElement.icon}
          />
        ))}
      </div>
    </div>
  )
}
