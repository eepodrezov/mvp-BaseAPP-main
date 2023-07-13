import { Fragment } from 'react'
import { useTranslate } from '@/shared/lib'
import {
  CAR_TYPE_FUEL_CONSTANTS_KEYS,
  CAR_TYPE_DRIVE_CONSTANTS_KEYS,
  CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS,
  CAR_TYPE_CONSTANTS_KEYS,
  CAR_TYPE_ECO_CONSTANTS_KEYS,
  Color,
  Car,
  getCarColorText,
  CAR_TYPE_WARRANTY_CONSTANTS_KEYS,
} from '../../lib'
import { FCWithClassName, TFunction } from '@/shared/@types'
import { Disclosure, Transition } from '@headlessui/react'
import DescriptionArrow from '@/shared/assets/icons/car-overview/description-arrow.svg'
import cn from 'classnames'
import { Button } from '@/shared/ui'
import { normalizeArrayToSeparatedString } from '@/shared/helpers'
import { getNumberWithDevider } from '@/shared/helpers'
import { InfoRow } from '@/shared/ui'
import { DELIVERY_TIME_RU, DELIVERY_TIME } from '@/shared/config'

export interface CarDescriptionProps {
  car: Car
}

type DescriptionOption = {
  field: keyof Car | string
  elementKeys?: string[]
  manufactureFieldNum?: 1 | 2
  tooltipText?: string
}

const carDescriptionOptions = [
  { field: 'type', elementKeys: CAR_TYPE_CONSTANTS_KEYS },
  { field: 'location' },
  { field: 'year' },
  { field: 'vin' },
  { field: 'brand' },
  { field: 'class' },
  { field: 'model' },
  { field: 'generation' },
  { field: 'deliveryTime' },
  { field: 'bodyType' },
  { field: 'manufacturer', manufactureFieldNum: 1 },
  { field: 'manufacturer', manufactureFieldNum: 2 },
  { field: 'firstRegDate' },
  { field: 'ownersCount' },
  { field: 'mileage' },
  { field: 'dealer' },
  { field: 'transmissionType', elementKeys: CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS },
  { field: 'driveType', elementKeys: CAR_TYPE_DRIVE_CONSTANTS_KEYS },
  { field: 'fuelType', elementKeys: CAR_TYPE_FUEL_CONSTANTS_KEYS },
  { field: 'enginePower' },
  { field: 'engineVolume' },
  { field: 'ecoType', elementKeys: CAR_TYPE_ECO_CONSTANTS_KEYS },
  { field: 'complect' },
  { field: 'exteriorColors' },
  { field: 'interiorColors' },
  { field: 'interiorMaterials' },
  { field: 'aditionalElements' },
  { field: 'warranty', elementKeys: CAR_TYPE_WARRANTY_CONSTANTS_KEYS },
] as DescriptionOption[]

export const CarDescription: FCWithClassName<CarDescriptionProps> = ({ car, className }) => {
  const { t } = useTranslate(['car'])
  function getCarDescriptionText(option: DescriptionOption, t: TFunction) {
    const carFieldValue = car[option.field as keyof Car]
    if (option.manufactureFieldNum === 1) return car?.manufacturer?.location?.country.name
    if (option.manufactureFieldNum === 2) return car?.manufacturer?.name
    if (option.field === 'model') return car.model?.name
    if (option.field === 'brand') return car.brand?.name
    if (option.field === 'bodyType') return t(car.bodyType?.name)
    if (option.field === 'dealer') return car.dealer?.name
    if (option.field === 'enginePower') return `${car.enginePower} ${t('HP')}`
    if (option.field === 'mileage') return `${getNumberWithDevider(car.mileage, ' ')} ${t('km')}`
    if (option.field === 'location')
      return normalizeArrayToSeparatedString([car?.location?.country.name, car?.location?.city], ', ')
    if (option.field === 'exteriorColors')
      return t(getCarColorText(car.colors?.filter(color => color.type === 1) as Color[]))
    if (option.field === 'interiorColors')
      return t(getCarColorText(car.colors?.filter(color => color.type === 0) as Color[]))
    if (option.field === 'engineVolume') return `${car?.literEngineVolume} ${t('L')}`
    if (option.field === 'deliveryTime') {
      return (
        (car?.location?.country?.name === 'Таможенный Союз'
          ? `${DELIVERY_TIME_RU} `
          : `${t('car:from')} ${DELIVERY_TIME} `) + t('car:days')
      )
    }
    if (option.field === 'firstRegDate' && carFieldValue) return new Date(carFieldValue as string).getFullYear()
    if (option.field === 'year' && carFieldValue === 0) return new Date(car.firstRegDate).getFullYear()
    if (option.elementKeys) return t(option.elementKeys?.[carFieldValue as number])
    if (carFieldValue || carFieldValue === 0) return carFieldValue as string | number
    return ''
  }
  function getOptionTitle(option: DescriptionOption, t: TFunction) {
    if (option.manufactureFieldNum === 1) return t('manufacturer.name')
    if (option.manufactureFieldNum === 2) return t('manufacturer.location')
    return t(option.field)
  }
  function getTooltipText(option: DescriptionOption, t: TFunction) {
    if (option.field === 'year' && car.year === 0) {
      return t('needToCheck')
    }
  }

  return (
    <div className={className}>
      <div className='hidden tablet:block mb-10'>
        <div className='croogla-secondary-text tablet:croogla-sub-title'>{t('Full Description')}</div>
        <div className='mt-10 columns-3 gap-y-5 gap-x-[90px]'>
          {carDescriptionOptions.map((option: DescriptionOption, index) => (
            <InfoRow
              key={option.field + index}
              text={getCarDescriptionText(option as DescriptionOption, t)}
              title={getOptionTitle(option, t)}
              className='mb-5'
              tooltipText={getTooltipText(option, t)}
            />
          ))}
        </div>
        {car.additionalInformation && (
          <div className='flex flex-col gap-5 w-full max-w-[850px] mt-10'>
            <h2 className='source-text'>{t('additionalInformation')}</h2>
            <p className='source-secondary-title text-black'>{car.additionalInformation}</p>
          </div>
        )}
      </div>
      <div className='tablet:hidden'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button as={Fragment}>
                <Button
                  variant='text'
                  className='w-full'
                  childrenClassName='w-full flex justify-between items-center croogla-secondary-text'
                >
                  {t('Full Description')}
                  <DescriptionArrow
                    className={cn('stroke-black', {
                      'rotate-180': !open,
                    })}
                  />
                </Button>
              </Disclosure.Button>
              <Transition
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Disclosure.Panel as='div' className='mt-5 flex flex-col gap-5'>
                  {carDescriptionOptions.map((option: DescriptionOption, index) => (
                    <InfoRow
                      key={option.field + index}
                      text={getCarDescriptionText(option as DescriptionOption, t)}
                      title={getOptionTitle(option, t)}
                      tooltipText={getTooltipText(option, t)}
                    />
                  ))}
                  {car.additionalInformation && (
                    <div className='flex flex-col gap-base w-full max-w-[850px] mt-small'>
                      <h2 className='source-text'>{t('additionalInformation')}</h2>
                      <p className='source-mobile-title text-black'>{car.additionalInformation}</p>
                    </div>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
