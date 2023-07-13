import { useEffect } from 'react'
import { Tabs } from '@/shared/ui'
import { useAtom } from 'jotai'
import { carCollectionMileage, carCollectionOwners, carCollectionType } from '../../model'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import { useResetAtom } from 'jotai/utils'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarTypeTabs: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['common'])
  const [carType, setCarType] = useAtom(carCollectionType)
  const resetOwnersRange = useResetAtom(carCollectionOwners)
  const resetMileageRange = useResetAtom(carCollectionMileage)

  useEffect(() => {
    if (carType != null) {
      resetOwnersRange()
      resetMileageRange()
    }
  }, [carType])

  return (
    <div className='w-full'>
      <FiltersApplyButton>
        <Tabs
          name='tabs'
          tabClassName='w-full desktop:!px-4'
          selectedTab={carType}
          onChange={setCarType}
          className={cn('w-full', className)}
          tabs={[
            { name: t('Tab1') },
            { name: t('Tab2') },
          ]}
        />
      </FiltersApplyButton>
    </div>
  )
}
