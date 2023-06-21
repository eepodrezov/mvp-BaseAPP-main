import { registrationEmailAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { PROFILE_PRIVATE_URL } from '@/widgets/profile-page-navbar'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { confirmEmailModalAtom } from '../model'

export const ConfirmRegistrationEmail: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose: onCloseConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const emailAfterRegistration = useAtomValue(registrationEmailAtom)
  const router = useRouter()
  const isProfilePrivate = router.query.tab === PROFILE_PRIVATE_URL
  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text'>{t(isProfilePrivate ? 'Confirm' : 'signUp')}</h1>
      <p className='text-text source-text'>
        {t('Follow the link from the email sent to')}
        <span className='text-black source-secondary-title'> {emailAfterRegistration}</span>
      </p>
      <div className='w-full flex justify-end'>
        <Button type='submit' className='!w-[176px]' data-testid='submitButton' onClick={onCloseConfirmEmailModal}>
          {t('Got it')}
        </Button>
      </div>
    </div>
  )
}
