import { FC } from 'react'
import CarPlugIcon from '@/shared/assets/icons/common/car-empty-plug.svg'
import { useTranslate } from '../change-language'
import { Button, Modal } from '@/shared/ui'
import { notificationModalData } from './store'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

export const NotificationModal: FC = () => {
  const { t } = useTranslate(['common'])
  const { payload, onAfterClose } = useAtomValue(notificationModalData)
  const setNotificationModalData = useUpdateAtom(notificationModalData)
  if (!payload) return null
  return (
    <Modal isOpen={!!payload} onClose={() => setNotificationModalData({})}>
      <div className='flex desktop:w-[500px] w-full items-center flex-col gap-[23px]'>
        <CarPlugIcon width={119} height={93} />
        <div className='flex flex-col items-center text-center gap-base'>
          <p className='text-black croogla-secondary-text'>{t('Oops')}!</p>
          <p className='text-text source-mobile-text desktop:source-text'>{payload}</p>
        </div>
        <Button
          className='!w-[175px]'
          onClick={() => {
            setNotificationModalData({})
            onAfterClose?.()
          }}
        >
          {t('ok').toUpperCase()}
        </Button>
      </div>
    </Modal>
  )
}
