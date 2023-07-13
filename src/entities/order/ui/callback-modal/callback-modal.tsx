import { useTranslate } from '@/shared/lib'
import { useModalState } from '@/shared/hooks'
import { orderCallbackModalAtom } from '../../model'
import { Button } from '@/shared/ui'
import { FC } from 'react'

export const CallbackModal: FC = () => {
  const { t } = useTranslate(['order'])
  const { onClose: onCallbackClose } = useModalState(orderCallbackModalAtom)
  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text'>{t('We have sent information about your order to the manager')}</h1>
      <p className='source-secondary-title font-normal'>{t('You will be contacted shortly')}</p>
      <div className='w-full flex justify-end'>
        <Button variant='primary' onClick={onCallbackClose}>
          {t('common:okay')}
        </Button>
      </div>
    </div>
  )
}
