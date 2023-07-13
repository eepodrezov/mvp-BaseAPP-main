import { registrationEmailAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { PROFILE_PRIVATE_URL } from '@/widgets/profile-page-navbar'
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { confirmEmailModalAtom } from '../model'
import { isPasswordRecoveryAtom } from '@/entities/viewer'

export const ConfirmEmail: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose: onCloseConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const emailAfterRegistration = useAtomValue(registrationEmailAtom)
  const [isPasswordRecovery, setIsPasswordRecovery] = useAtom(isPasswordRecoveryAtom)
  const router = useRouter()
  const isProfilePrivate = router.query.tab === PROFILE_PRIVATE_URL

  const generateTitleConfirmEmail = () => {
    if (isProfilePrivate) return t('Confirm')
    if (isPasswordRecovery) return t('Password_recovery')
    return t('signUp')
  }
  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text'>{generateTitleConfirmEmail()}</h1>
      <p className='text-text source-text'>
        {t('Follow the link from the email sent to')}
        <span className='text-black source-secondary-title'> {emailAfterRegistration}</span>
      </p>
      <div className='w-full flex justify-end'>
        <Button
          type='submit'
          className='!w-[176px]'
          data-testid='submitButton'
          onClick={() => [onCloseConfirmEmailModal(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
        >
          {t('Got it')}
        </Button>
      </div>
    </div>
  )
}
