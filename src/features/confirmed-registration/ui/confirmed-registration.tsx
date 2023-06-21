import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { FC } from 'react'
import { confirmedRegistrationModalAtom } from '../model'
import ConfirmedIcon from '@/shared/assets/icons/common/sign-up-confirmed.svg'
import { signInModalAtom } from '@/features/auth'
import { PROFILE_PRIVATE_URL } from '@/widgets/profile-page-navbar'
import { useRouter } from 'next/router'
import { useAtomValue } from 'jotai'
import { isProfilePrivateConfirmAtom } from '@/features/confirm-registration-email'
import cn from 'classnames'

export const ConfirmedRegistration: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose: onCloseConfirmedRegModal } = useModalState(confirmedRegistrationModalAtom)
  const { onOpen: onOpenAuthModal } = useModalState(signInModalAtom)
  const isProfilePrivateConfirm = useAtomValue(isProfilePrivateConfirmAtom)
  const router = useRouter()
  const isProfilePrivate = router.pathname === PROFILE_PRIVATE_URL || isProfilePrivateConfirm
  return (
    <div
      className={cn('flex flex-col w-full gap-[23px] select-none', {
        'desktop:w-[500px]': !isProfilePrivate,
        'desktop:w-[400px]': isProfilePrivate,
      })}
    >
      {!isProfilePrivate && <h1 className='croogla-secondary-text'>{t('signUp')}</h1>}
      <div className={cn('flex items-center gap-3', { 'w-full justify-center pt-medium': isProfilePrivate })}>
        <ConfirmedIcon className='stroke-green' />
        <p className='text-green desktop:source-text source-mobile-text'>
          {t(`${isProfilePrivate ? 'Confirm' : 'Registration'} completed successfully`)}
        </p>
      </div>

      <div
        className={cn('w-full flex gap-[23px] flex-col-reverse desktop:flex-row', {
          'justify-center': isProfilePrivate,
          'justify-end': !isProfilePrivate,
        })}
      >
        <Button
          variant='text'
          className='desktop:!w-[175px] h-[50px]'
          onClick={onCloseConfirmedRegModal}
          data-testid='closeButton'
        >
          {t(`${isProfilePrivate ? 'Back' : 'Back to Catalogue'}`)}
        </Button>
        {!isProfilePrivate && (
          <Button
            type='submit'
            className='desktop:!w-[176px]'
            data-testid='submitButton'
            onClick={() => {
              onCloseConfirmedRegModal()
              setTimeout(() => {
                onOpenAuthModal()
              }, 400)
            }}
          >
            {t('signInTitle')}
          </Button>
        )}
      </div>
    </div>
  )
}
