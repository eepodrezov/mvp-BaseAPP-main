import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { FC } from 'react'
import { confirmedModalAtom } from '../model'
import ConfirmedIcon from '@/shared/assets/icons/common/sign-up-confirmed.svg'
import { signInModalAtom } from '@/features/auth'
import { PROFILE_PRIVATE_URL } from '@/widgets/profile-page-navbar'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { isProfilePrivateConfirmAtom } from '@/features/confirm-email'
import cn from 'classnames'
import { isPasswordRecoveryAtom } from '@/entities/viewer'

export const Confirmed: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose: onCloseConfirmedRegModal } = useModalState(confirmedModalAtom)
  const { onOpen: onOpenAuthModal } = useModalState(signInModalAtom)
  const [isProfilePrivateConfirm, setIsProfilePrivateConfirm] = useAtom(isProfilePrivateConfirmAtom)
  const [isPasswordRecovery, setIsPasswordRecovery] = useAtom(isPasswordRecoveryAtom)
  const router = useRouter()
  const isProfilePrivate = router.pathname === PROFILE_PRIVATE_URL || isProfilePrivateConfirm

  const generateTitleConfirmed = () => {
    if (isProfilePrivate) return t('Confirm completed successfully')
    if (isPasswordRecovery) return t('Password_recovered_succesfully')
    return t('Registration completed successfully')
  }

  const onClose = () => {
    onCloseConfirmedRegModal()
    setIsProfilePrivateConfirm(false)
    setIsPasswordRecovery(false)
  }

  return (
    <div
      className={cn('flex flex-col w-full gap-[23px] select-none', {
        'desktop:w-[500px]': !isProfilePrivate,
        'desktop:w-[400px]': isProfilePrivate,
      })}
    >
      {!isProfilePrivate && (
        <h1 className='croogla-secondary-text'>{t(isPasswordRecovery ? 'Password_recovery' : 'signUp')}</h1>
      )}
      <div className={cn('flex items-center gap-3', { 'w-full justify-center pt-medium': isProfilePrivate })}>
        <ConfirmedIcon className='stroke-green' />
        <p className='text-green desktop:source-text source-mobile-text'>{generateTitleConfirmed()}</p>
      </div>

      <div
        className={cn('w-full flex gap-[23px] flex-col-reverse desktop:flex-row', {
          'justify-center': isProfilePrivate,
          'justify-end': !isProfilePrivate,
        })}
      >
        <Button variant='text' className='desktop:!w-[175px] h-[50px]' onClick={onClose} data-testid='closeButton'>
          {t(isProfilePrivate ? 'Back' : 'Back to Catalogue')}
        </Button>
        {!isProfilePrivate && (
          <Button
            type='submit'
            data-testid='submitButton'
            onClick={() => {
              onCloseConfirmedRegModal()
              setTimeout(() => {
                onOpenAuthModal()
              }, 400)
              setTimeout(() => {
                setIsPasswordRecovery(false)
                setIsProfilePrivateConfirm(false)
              }, 300)
            }}
          >
            {t('signInTitle')}
          </Button>
        )}
      </div>
    </div>
  )
}
