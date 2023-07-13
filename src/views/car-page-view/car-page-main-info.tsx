import { useTranslate } from '@/shared/lib'
import { CAR_TYPE_CONSTANTS_KEYS, Car } from '@/entities/car'
import { FCWithClassName, TFunction } from '@/shared/@types'
import { getNumberWithDevider, normalizeArrayToSeparatedString } from '@/shared/helpers'
import { InfoRow } from '@/shared/ui'
import { getCarYear } from '@/entities/car'
import { useRouter } from 'next/router'
import { DELIVERY_TIME, DELIVERY_TIME_RU, LANG_EN } from '@/shared/config'

export interface CarPageMainInfoProps {
  car?: Car
}

type InfoOption = { field: string; tooltip?: string }

const infoOptions = [
  { field: 'location' },
  { field: 'year' },
  { field: 'vin' },
  { field: 'brand' },
  { field: 'model' },
  { field: 'mileage' },
  { field: 'ownersCount' },
  { field: 'deliveryTime', tooltip: 'deliveryTime' },
] as InfoOption[]

export const CarPageMainInfo: FCWithClassName<CarPageMainInfoProps> = ({ car, className }) => {
  const { t } = useTranslate(['car', 'common'])
  const { locale } = useRouter()
  function getOptionText(option: InfoOption, car: Car, t: TFunction) {
    const carFieldValue = car[option.field as keyof Car]
    if (option.field === 'location')
      return normalizeArrayToSeparatedString([car?.location?.country?.name, car?.location?.city], ', ')
    if (option.field === 'mileage' && carFieldValue)
      return `${getNumberWithDevider(Number(carFieldValue), ' ')} ${t('km')}`
    if (option.field === 'brand') return car.brand?.name
    if (option.field === 'model') return car.model?.name
    if (option.field === 'deliveryTime') {
      return (
        (car?.location?.country?.name === 'Таможенный Союз'
          ? `${DELIVERY_TIME_RU} `
          : `${t('car:from')} ${DELIVERY_TIME} `) + t('car:days')
      )
    }
    if (option.field === 'year') return getCarYear(car)
    if (carFieldValue || carFieldValue === 0) return String(carFieldValue)
  }
  function getTooltipText(option: InfoOption) {
    if (option.field === 'year' && car?.year === 0) return t('needToCheck')
    if (option.tooltip) return t(option.tooltip)
  }
  return (
    <div className={className}>
      <div className='flex justify-between'>
        <span className='croogla-mobile desktop:croogla-sub-title'>{t('Vehicle Info')}</span>
        <span className='source-text text-border desktop:source-title'>
          {car && `${t('common:' + CAR_TYPE_CONSTANTS_KEYS[car.type])} ${locale === LANG_EN ? t('car') : ''}`}
        </span>
      </div>
      <div className='mt-5 flex flex-col gap-5'>
        {car &&
          infoOptions.map((option: InfoOption, index) => (
            <InfoRow
              hasPlug
              key={option.field + index}
              title={t(option.field)}
              text={getOptionText(option, car, t)}
              tooltipText={getTooltipText(option)}
            />
          ))}
      </div>
    </div>
  )
}
