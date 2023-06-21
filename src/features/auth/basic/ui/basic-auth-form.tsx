import { useModalState } from '@/shared/hooks'
import { Form, queryClientAtom, useTranslate } from '@/shared/lib'
import { Button, Input } from '@/shared/ui'
import { FC } from 'react'
import { signInModalAtom, onAuth } from '../model'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import {
  registrationEmailAtom,
  registrationModalAtom,
  registrationPhoneAtom,
  confirmEmailModalAtom,
  confirmPhoneModalAtom,
  serverSideConfirmCodeValidation,
  useResendActivationCode,
  authSchema,
} from '@/features'
import { PHONE_REG_EXP } from '@/shared/config'
import _ from 'lodash'

type FormFieldAuth = {
  username: string
  password: string
}

export const BasicAuthForm: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose } = useModalState(signInModalAtom)
  const { onOpen: onOpenRegistrationModal } = useModalState(registrationModalAtom)
  const queryClient = useAtomValue(queryClientAtom)
  const setEmailConfirm = useUpdateAtom(registrationEmailAtom)
  const setPhoneConfirm = useUpdateAtom(registrationPhoneAtom)
  const { onOpen: onOpenConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const { onOpen: onOpenConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)

  const { mutate } = useResendActivationCode({
    onError: error => serverSideConfirmCodeValidation(t, error),
  })

  const handleConfirmedViewer = (isMobile: boolean, username: string) => {
    if (isMobile) {
      setPhoneConfirm(username)
      onOpenConfirmPhoneModal()
      mutate({ phone: username })
    } else {
      setEmailConfirm(username)
      onOpenConfirmEmailModal()
      mutate({ email: username })
    }
  }
  const onOpenСonfirmedViewer = _.debounce(handleConfirmedViewer, 400)

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <div className='flex items-center justify-between'>
        <h1 className='croogla-secondary-text'>{t('signInTitle')}</h1>
        <div className='flex items-center gap-small'>
          <p className='text-text whitespace-nowrap source-text hidden desktop:inline'>{t('notRegistered')}</p>
          <Button
            variant='text'
            onClick={() => {
              onClose()
              setTimeout(() => {
                onOpenRegistrationModal()
              }, 400)
            }}
          >
            {t('signUp')}
          </Button>
        </div>
      </div>
      <Form<FormFieldAuth>
        validationSchema={authSchema(t)}
        onSubmit={data =>
          onAuth(data, PHONE_REG_EXP.test(data.username), t, onClose, queryClient, onOpenСonfirmedViewer)
        }
        formParams={{ mode: 'onChange' }}
      >
        {({ isLoading, formState: { isValid } }) => (
          <div className='flex flex-col gap-[23px]'>
            <Input label={t('login')} name='username' placeholder={t('placeholderLogin')} />
            <div className='flex flex-col items-end gap-small'>
              <Input label={t('password')} name='password' placeholder={t('password')} type='password' />
              <a className='cursor-pointer text-red'>{t('forgotPassword')}</a>
            </div>
            <div className='w-full flex gap-[23px] justify-end'>
              <Button variant='text' className='!w-[85px]' onClick={onClose} data-testid='closeButton'>
                {t('cancel')}
              </Button>
              <Button
                type='submit'
                className='!w-[176px]'
                disabled={!isValid}
                loading={isLoading}
                data-testid='submitButton'
              >
                {t('signIn')}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
