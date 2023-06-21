import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { dealerCollectionName, useDealerCollection, carCollectionDealer } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarDealerSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const { data, isLoading } = useDealerCollection()
  const setName = useUpdateAtom(dealerCollectionName)
  const [dealer, setDealer] = useAtom(carCollectionDealer)

  return (
    <FiltersApplyButton>
      <Select
        name='car-dealer'
        label={t('Dealer')}
        value={dealer}
        className={className}
        isLoading={isLoading}
        options={normalizeSelectOptions(data?.items)}
        onChange={setDealer}
        onSearch={setName}
      />
    </FiltersApplyButton>
  )
}
