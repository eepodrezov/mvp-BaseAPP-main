import { viewerAtom } from '@/entities/viewer'
import { useTranslate } from '@/shared/lib'
import { Switch, Tooltip } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import { FC, useState } from 'react'
import { useChangeSettings, useCreateSettings, useSettingsCollection } from '../model'

export const ChangeSettings: FC = () => {
  const viewer = useAtomValue(viewerAtom)
  const { t } = useTranslate(['profile'])
  const [emailLoading, setEmailLoading] = useState(true)
  const [smsLoading, setSmsLoading] = useState(false)
  // const [telegramlLoading, setTelegramLoading] = useState(false)

  const { data, isLoading, refetch } = useSettingsCollection(viewer!.id, {
    enabled: !!viewer,
    retry: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSettled: () => {
      setEmailLoading(false)
      setSmsLoading(false)
      // setTelegramLoading(false)
    },
  })
  const { mutate: update } = useChangeSettings({
    onSuccess: () => refetch(),
  })
  const { mutate: create } = useCreateSettings({
    onSuccess: () => refetch(),
  })

  return (
    <div className='flex flex-col gap-medium'>
      <p className='text-text font-normal source-sub-title desktop:source-underline'>{t('Notifications')}</p>
      <div className='flex flex-col items-start gap-5'>
        <Tooltip label={t('Connect account')} placement='right' isActive={!viewer!.email}>
          <Switch
            value={data?.items[0]?.email}
            name='email'
            label={t('Send to E-mail')}
            wrapperClassName='flex flex-row-reverse !gap-5'
            labelClassName='w-max source-mobile-text desktop:source-text'
            onChange={value => {
              setEmailLoading(true)
              data?.items[0]?.id
                ? update({ id: data?.items[0]?.id, email: value })
                : create({ email: value, sms: false, telegram: false })
            }}
            disabled={!viewer!.email}
            loading={isLoading || emailLoading}
            data-testid='email'
          />
        </Tooltip>
        {/*Скорее всего понадобится
         <Tooltip label={t('Connect account')} placement='right' isActive={!viewer!.telegram}>
          <Switch
            name='telegram'
            value={data?.items[0]?.telegram}
            label={t('Send to Telegram')}
            wrapperClassName='flex flex-row-reverse !gap-5'
            labelClassName='w-max source-mobile-text desktop:source-text'
            onChange={value => {
              setTelegramLoading(true)
              data?.items[0]?.id
                ? update({ id: data?.items[0]?.id, telegram: value })
                : create({ email: false, sms: false, telegram: value })
            }}
            disabled={!viewer!.telegram}
            loading={isLoading || telegramlLoading}
            data-testid='telegram'
          />
        </Tooltip> */}
        <Tooltip label={t('Connect account')} placement='right' isActive={!viewer!.phone}>
          <Switch
            name='sms'
            value={data?.items[0]?.sms}
            label={t('Send SMS-notifications')}
            wrapperClassName='flex flex-row-reverse !gap-5'
            labelClassName='w-max source-mobile-text desktop:source-text'
            onChange={value => {
              setSmsLoading(true)
              data?.items[0]?.id
                ? update({ id: data?.items[0]?.id, sms: value })
                : create({ email: false, sms: value, telegram: false })
            }}
            disabled={!viewer!.phone}
            loading={isLoading || smsLoading}
            data-testid='sms'
          />
        </Tooltip>
      </div>
    </div>
  )
}
