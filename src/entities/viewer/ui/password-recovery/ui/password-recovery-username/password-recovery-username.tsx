import { Form, useTranslate } from '@/shared/lib'
import { FC } from 'react'
import {
  isPasswordRecoveryAtom,
  passwordRecoveryPasswordsModalAtom,
  passwordRecoveryUsernameModalAtom,
  usePasswordRecoveryUsername,
} from '../../model'
import { useModalState } from '@/shared/hooks'
import {
  passwordRecoveryUsernameSchema,
  serverSidePasswordRecoveryValidation,
  PasswordRecoveryUsernameForm,
} from '../../lib'
import { Button, Input } from '@/shared/ui'
import { PHONE_REG_EXP } from '@/shared/config'
import { useAtom } from 'jotai'
import { registrationEmailAtom, registrationPhoneAtom } from '@/features/registration'
import { useUpdateAtom } from 'jotai/utils'
import { confirmEmailModalAtom } from '@/features/confirm-email'

export const PasswordRecoveryUsername: FC = () => {
  const { t } = useTranslate(['common'])

  const { onClose } = useModalState(passwordRecoveryUsernameModalAtom)
  const { onOpen: onOpenPasswordRecovery } = useModalState(passwordRecoveryPasswordsModalAtom)
  const { onOpen: onOpenConfirmEmailModal } = useModalState(confirmEmailModalAtom)

  const [phoneAfterRecovery, setPhoneAfterRecovery] = useAtom(registrationPhoneAtom)
  const setEmailAfterRecovery = useUpdateAtom(registrationEmailAtom)
  const setIsPasswordRecovery = useUpdateAtom(isPasswordRecoveryAtom)

  const { mutate, isLoading } = usePasswordRecoveryUsername({
    onSuccess: () => {
      onClose()
      setTimeout(() => {
        if (phoneAfterRecovery) onOpenPasswordRecovery()
        else onOpenConfirmEmailModal()
      }, 400)
    },
    onError: err => serverSidePasswordRecoveryValidation(t, err),
  })

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text pt-1'>{t('Password_recovery')}</h1>
      <p className='text-text source-text'>{t('Enter_registered_account_phone_number_or_email')}</p>
      <Form<PasswordRecoveryUsernameForm>
        validationSchema={passwordRecoveryUsernameSchema(t)}
        onSubmit={data => {
          setPhoneAfterRecovery('')
          setEmailAfterRecovery('')
          if (PHONE_REG_EXP.test(data.username)) setPhoneAfterRecovery(data.username)
          else setEmailAfterRecovery(data.username)
          setIsPasswordRecovery(true)
          setTimeout(() => mutate(data))
        }}
        formParams={{ mode: 'onChange' }}
      >
        {({ formState: { isValid } }) => (
          <div className='flex flex-col gap-[23px]'>
            <Input name='username' label={t('placeholderLogin')} placeholder={t('placeholderLogin')} />
            <div className='w-full flex gap-[23px] justify-end'>
              <Button
                variant='text'
                className='!w-[85px]'
                onClick={() => [onClose(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
                data-testid='closeButton'
              >
                {t('cancel')}
              </Button>
              <Button
                type='submit'
                className='!w-[176px] break-keep'
                disabled={!isValid}
                loading={isLoading}
                data-testid='submitButton'
              >
                {t('Next')}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
