import { normalizeSelectOptions } from '@/shared/helpers'
import { useTranslate } from '@/shared/lib'
import { Select, Tooltip } from '@/shared/ui'
import { useAtom, useAtomValue } from 'jotai'
import { useConfigurationCollection, carCollectionConfiguration, carCollectionModel } from '../../model'
import { FCWithClassName } from '@/shared/@types'
import { FiltersApplyButton } from '@/features'

export const CarConfigurationSelect: FCWithClassName = ({ className }) => {
  const { t } = useTranslate(['car'])
  const model = useAtomValue(carCollectionModel)
  const { data, isLoading } = useConfigurationCollection({
    enabled: !!model,
  })
  const [configuration, setConfiguration] = useAtom(carCollectionConfiguration)

  return (
    <Tooltip label={t('Choose a model first')} isActive={!model} placement='bottom'>
      <FiltersApplyButton>
        <Select
          name='car-configuration'
          label={t('Complect')}
          value={configuration}
          className={className}
          isLoading={isLoading}
          disabled={!model}
          options={normalizeSelectOptions(data?.items)}
          onChange={setConfiguration}
        />
      </FiltersApplyButton>
    </Tooltip>
  )
}
