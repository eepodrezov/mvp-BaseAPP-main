import { useTranslate } from '@/shared/lib'
import { useModalState } from '@/shared/hooks'
import { AreYouSureModalAtom } from '../../model'
import { Button } from '@/shared/ui'
import { FCWithChildren } from '@/shared/@types'
import { MouseEventHandler } from 'react'

export interface AreYouSureProps {
  textNextBtn?: string
  handleClose: MouseEventHandler
  onClose?: () => void
}

export const AreYouSure: FCWithChildren<AreYouSureProps> = ({
  handleClose,
  onClose,
  textNextBtn = 'common:Next',
  children,
}) => {
  const { t } = useTranslate(['profile'])
  const { onClose: onCloseSure } = useModalState(AreYouSureModalAtom)
  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <div className='flex items-center justify-between'>
        <h1 className='croogla-secondary-text'>{t('common:areYouSure')}</h1>
      </div>
      <p className='source-secondary-title font-normal'>{children}</p>
      <div className='w-full flex gap-[23px] mt-5 justify-end'>
        <Button variant='text' className='!w-[85px]' onClick={() => [onCloseSure(), onClose?.()]}>
          {t('common:cancel')}
        </Button>
        <Button onClick={handleClose} className='!w-[176px]'>
          {t(textNextBtn)}
        </Button>
      </div>
    </div>
  )
}
