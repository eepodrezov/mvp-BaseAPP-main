import { FC } from 'react'
import { isPasswordRecoveryAtom, passwordRecoveryPasswordsModalAtom, usePasswordRecoveryPasswords } from '../../model'
import { Form, useTranslate } from '@/shared/lib'
import {
  passwordRecoveryPasswordsSchema,
  serverSidePasswordRecoveryValidation,
  PasswordRecoveryPasswordsForm,
} from '../../lib'
import { useModalState, useTimerDown } from '@/shared/hooks'
import { Input, Button } from '@/shared/ui'
import { Controller } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { confirmedModalAtom } from '@/features/confirmed'
import { registrationPhoneAtom } from '@/features/registration'
import { useRouter } from 'next/router'
import { RouterQueryParams } from '@/shared/@types'
import { useUpdateAtom } from 'jotai/utils'
import { useResendActivationCode, serverSideConfirmCodeValidation } from '@/features'

export const PasswordRecoveryPasswords: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose } = useModalState(passwordRecoveryPasswordsModalAtom)
  const { onOpen: onOpenConfirmedModal } = useModalState(confirmedModalAtom)
  const router = useRouter()
  const { code, email } = router.query as RouterQueryParams
  const setIsPasswordRecovery = useUpdateAtom(isPasswordRecoveryAtom)
  const usernamePhonePasswordRecovery = useAtomValue(registrationPhoneAtom)
  const { seconds, formatedDelay, setSeconds } = useTimerDown(60)

  const { mutate, isLoading } = usePasswordRecoveryPasswords({
    onSuccess: () => {
      onClose()
      router.replace('/', undefined, { shallow: true })
      setTimeout(() => {
        onOpenConfirmedModal()
      }, 400)
    },
    onError: err => serverSidePasswordRecoveryValidation(t, err),
  })

  const { mutate: mutateResendCode } = useResendActivationCode({
    onSuccess: () => {
      setSeconds(60)
    },
    onError: error => serverSideConfirmCodeValidation(t, error),
  })

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text pt-1'>{t('common:Password_recovery')}</h1>
      <p className='text-text source-text'>{t('common:Create_a_new_password')}</p>
      <Form<Pick<PasswordRecoveryPasswordsForm, 'newPassword' | 'repeatPassword' | 'code'>>
        validationSchema={passwordRecoveryPasswordsSchema(t, !code)}
        onSubmit={data =>
          mutate({
            ...data,
            code: data.code || code,
            email,
            phone: usernamePhonePasswordRecovery,
          })
        }
        autoComplete='off'
        formParams={{ mode: 'onChange' }}
      >
        {({ formState: { isValid }, control, trigger, watch }) => (
          <div className='flex flex-col gap-[23px]'>
            {!code && (
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
                  <a onClick={() => mutateResendCode({ phone: usernamePhonePasswordRecovery, isRepeat: true })}>
                    {t('Send again')}
                  </a>
                )}
              </div>
            )}
            <Controller
              name='newPassword'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label={t('New_password')}
                  placeholder={t('New_password')}
                  type='password'
                  onChange={e => {
                    field.onChange(e)
                    watch('repeatPassword') && trigger('repeatPassword')
                  }}
                  passwordStrength
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Input
              name='repeatPassword'
              label={t('RepeatPassword')}
              placeholder={t('RepeatPassword')}
              type='password'
              passwordStrength
            />
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
                {t('Accept')}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
