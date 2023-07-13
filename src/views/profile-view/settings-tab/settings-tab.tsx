import { changePasswordModalAtom, ChangePassword, ChangeSettings, viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import { FC } from 'react'

export const SettingsTab: FC = () => {
  const { t } = useTranslate(['profile'])
  const { isOpen, onOpen, onClose } = useModalState(changePasswordModalAtom)
  const viewer = useAtomValue(viewerAtom)
  if (!viewer) return null
  return (
    <div className='flex flex-col gap-10 p-10'>
      <h1 className='desktop:croogla-title croogla-text text-black'>{t('Settings')}</h1>
      <ChangeSettings />
      <div className='flex flex-col gap-medium'>
        <p className='text-text source-sub-title desktop:source-underline'>{t('Security')}</p>
        <Button
          variant='text'
          onClick={onOpen}
          className='source-mobile-title desktop:source-secondary-title !justify-start !w-[140px]'
        >
          {t('Change password')}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ChangePassword />
        </Modal>
      </div>
    </div>
  )
}
