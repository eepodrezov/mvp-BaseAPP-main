import { Tabs } from '@/shared/ui'
import { useAtom } from 'jotai'
import {  productCollectionType } from '../../model'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'


export const ProductTypeTabs: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['common'])
  const [productType, setProductType] = useAtom(productCollectionType)
  //todo after tab switch - reset all filters

  return (
    <div className='w-full'>
      <FiltersApplyButton>
        <Tabs
          name='tabs'
          tabClassName='w-full desktop:!px-4'
          selectedTab={productType}
          onChange={setProductType}
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
