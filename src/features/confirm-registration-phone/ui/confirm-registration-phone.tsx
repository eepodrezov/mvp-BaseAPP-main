import { confirmedRegistrationModalAtom, registrationPhoneAtom, useConfirmCode } from '@/features'
import { useModalState, useTimerDown } from '@/shared/hooks'
import { Form, notificationModalData, queryClientAtom, useTranslate } from '@/shared/lib'
import { Button, Input, Modal } from '@/shared/ui'
import { FC, useEffect } from 'react'
import { confirmPhoneModalAtom, useResendActivationCode } from '../model'
import { confirmCodeSchema, RequestConfirmRegPhone, serverSideConfirmCodeValidation } from '../lib'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { AreYouSure, AreYouSureModalAtom, USER_COLLECTION_PRIMARY_KEY } from '@/entities/viewer'
import { PROFILE_PRIVATE_URL } from '@/widgets/profile-page-navbar'

export const ConfirmRegistrationPhone: FC = () => {
  const { t } = useTranslate(['common', 'profile'])
  const { onClose: onCloseConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)
  const { onOpen: onOpenConfirmedModal } = useModalState(confirmedRegistrationModalAtom)
  const { onOpen: onOpenSure, onClose: onCloseSure, isOpen: isOpenSure } = useModalState(AreYouSureModalAtom)
  const phoneAfterRegistration = useAtomValue(registrationPhoneAtom)
  const setNotificationModalData = useUpdateAtom(notificationModalData)
  const router = useRouter()
  const isProfilePrivate = router.pathname === PROFILE_PRIVATE_URL
  const queryClient = useAtomValue(queryClientAtom)
  const { seconds, formatedDelay, setSeconds } = useTimerDown(isProfilePrivate ? 120 : 60)

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url.split('#')[1] === 'registration=true') router.push('#registration=true')
      else if (isProfilePrivate) return false
      else router.push('#auth=true')

      return true
    })
    return () => {
      router.beforePopState
    }
  }, [])

  const { mutate } = useConfirmCode({
    onSuccess: () => {
      onCloseConfirmPhoneModal()
      setTimeout(() => {
        onOpenConfirmedModal()
      }, 400)
      queryClient.invalidateQueries({ queryKey: USER_COLLECTION_PRIMARY_KEY })
    },
    onError: error => serverSideConfirmCodeValidation(t, error, setNotificationModalData),
  })

  const { mutate: mutateResendCode } = useResendActivationCode({
    onSuccess: () => {
      setSeconds(isProfilePrivate ? 120 : 60)
    },
    onError: error => serverSideConfirmCodeValidation(t, error),
  })

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text'>{t(isProfilePrivate ? 'common:Confirm' : 'signUp')}</h1>
      <p className='text-text source-text'>{t('Enter code from the SMS')}</p>
      <Form<RequestConfirmRegPhone>
        validationSchema={confirmCodeSchema(t)}
        onSubmit={data => mutate({ code: data.code, phone: phoneAfterRegistration, isRepeat: isProfilePrivate })}
        formParams={{ mode: 'onChange' }}
      >
        {({ isLoading, formState: { isValid } }) => (
          <div className='flex flex-col gap-[23px]'>
            <div className='flex flex-col items-end gap-small'>
              <Input
                inputMode='numeric'
                label={t('SMS code')}
                name='code'
                placeholder='_ _ _ _'
                type='number'
                maxLength={4}
              />
              {seconds ? (
                <div className='flex gap-2'>
                  <p className='text-border source-text'>{t('Resend in')}</p>
                  <span className='source-text text-text'>{formatedDelay}</span>
                </div>
              ) : (
                <a onClick={() => mutateResendCode({ phone: phoneAfterRegistration, isRepeat: isProfilePrivate })}>
                  {t('Send again')}
                </a>
              )}
            </div>
            <div className='w-full flex gap-[23px] justify-end'>
              <Button variant='text' className='!w-[85px]' onClick={onOpenSure} data-testid='closeButton'>
                {t('Back')}
              </Button>
              <Button
                type='submit'
                className='!w-[176px]'
                data-testid='submitButton'
                loading={isLoading}
                disabled={!isValid}
              >
                {t('Accept')}
              </Button>
            </div>
          </div>
        )}
      </Form>
      <Modal isOpen={isOpenSure} onClose={onCloseSure}>
        <AreYouSure
          handleClose={() => {
            onCloseSure()
            setTimeout(() => onCloseConfirmPhoneModal(), 400)
            !isProfilePrivate && setTimeout(() => router.back(), 800)
          }}
          onClose={onCloseSure}
        >
          {t('Account activation process will be interrupted')}
        </AreYouSure>
      </Modal>
    </div>
  )
}
