import { useEffect } from 'react'
import { Tabs } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionMileage, carCollectionOwners, carCollectionType } from '../../model'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import { CAR_TYPE_CONSTANTS_KEYS, CAR_TYPE_NEW, CAR_TYPE_USED } from '../../lib'
import { useResetAtom } from 'jotai/utils'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarTypeTabs: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const [carType, setCarType] = useAtom(carCollectionType)
  const resetOwnersRange = useResetAtom(carCollectionOwners)
  const resetMileageRange = useResetAtom(carCollectionMileage)

  useEffect(() => {
    if (carType) {
      resetOwnersRange()
      resetMileageRange()
    }
  }, [carType])

  return (
    <div className='w-full'>
      <FiltersApplyButton>
        <Tabs
          name='tabs'
          tabClassName='w-full'
          selectedTab={carType}
          onChange={setCarType}
          className={cn('w-full', className)}
          tabs={[
            { name: t(CAR_TYPE_CONSTANTS_KEYS[CAR_TYPE_NEW]) },
            { name: t(CAR_TYPE_CONSTANTS_KEYS[CAR_TYPE_USED]) },
          ]}
        />
      </FiltersApplyButton>
    </div>
  )
}
