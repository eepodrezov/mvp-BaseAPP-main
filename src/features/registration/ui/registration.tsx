import { FC, useState } from 'react'
import { useUpdateAtom } from 'jotai/utils'

import { useModalState } from '@/shared/hooks'
import { useTranslate, Form } from '@/shared/lib'
import { registrationSchema, RequestRegistrationTypes, serverSideRegistrationValidation } from '../lib'
import { registrationEmailAtom, registrationModalAtom, registrationPhoneAtom, useRegistration } from '../model'
import { confirmEmailModalAtom, confirmPhoneModalAtom, signInModalAtom } from '@/features'

import { Button, Checkbox, Input, TypeMobilePhone } from '@/shared/ui'
import { getDeepClone } from '@/shared/helpers'
import { Controller } from 'react-hook-form'
import { PLACEHOLDER_MOBILE_PHONE } from '@/shared/config'
import Link from 'next/link'
import { getTokens } from '@/shared/lib'

export const Registration: FC = () => {
  const { fingerprint } = getTokens()

  const { t } = useTranslate(['common'])
  const { onOpen: onOpenSignIn } = useModalState(signInModalAtom)
  const { onClose: onCloseRegistrationModal } = useModalState(registrationModalAtom)
  const { onOpen: onOpenConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const { onOpen: onOpenConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)
  const [isFieldEmail, setIsFieldEmail] = useState(true)
  const setEmailModal = useUpdateAtom(registrationEmailAtom)
  const setPhoneModal = useUpdateAtom(registrationPhoneAtom)

  const { mutate, isLoading } = useRegistration(
    {
      onSuccess: data => {
        onCloseRegistrationModal()
        setTimeout(() => {
          if (isFieldEmail) {
            setEmailModal(data.email)
            onOpenConfirmEmailModal()
          } else {
            setPhoneModal(data.phone)
            onOpenConfirmPhoneModal()
          }
        }, 400)
      },
      onError: error => serverSideRegistrationValidation(t, error, isFieldEmail),
    },
    undefined,
    fingerprint as string
  )

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <div className='flex items-center justify-between text-center'>
        <h1 className='croogla-secondary-text pt-1'>{t('signUp')}</h1>
        <div className='flex items-center gap-small'>
          <p className='text-text whitespace-nowrap pl-medium source-text hidden desktop:inline'>
            {t('I have an account')}
          </p>
          <Button
            variant='text'
            onClick={() => {
              onCloseRegistrationModal()
              setTimeout(() => {
                onOpenSignIn()
              }, 400)
            }}
          >
            {t('signInTitle')}
          </Button>
        </div>
      </div>
      <Form<RequestRegistrationTypes>
        //@ts-expect-error
        validationSchema={registrationSchema(t, isFieldEmail)}
        onSubmit={data => {
          const normalizeData = getDeepClone(data)
          delete normalizeData.repeatPassword
          delete normalizeData.userAgreementConfirmation
          if (!isFieldEmail) normalizeData.username = '+' + data.username
          mutate(normalizeData)
        }}
        formParams={{ mode: 'onChange', shouldUnregister: true }}
      >
        {({ formState: { isValid }, control, setValue, trigger, watch }) => (
          <div className='flex flex-col gap-[23px]'>
            <div className='flex flex-col items-end gap-small'>
              {isFieldEmail ? (
                <Input label={t('Email')} name='username' placeholder={t('Email')} />
              ) : (
                <Controller
                  name='username'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input<TypeMobilePhone>
                      type='tel'
                      placeholder={PLACEHOLDER_MOBILE_PHONE}
                      label={t('phoneNumber')}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                  )}
                />
              )}
              <a
                onClick={() => {
                  setIsFieldEmail(prev => !prev)
                  setValue('username', '')
                }}
              >
                {isFieldEmail ? t('Sign up with phone number') : t('Sign up with e-mail')}
              </a>
            </div>
            <Input label={t('Last name')} name='lastName' placeholder={t('Last name')} />
            <Input label={t('First name')} name='firstName' placeholder={t('First name')} />
            <Input label={t('Middle name')} name='middleName' placeholder={t('Middle name')} />
            <Controller
              name='plainPassword'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  name='plainPassword'
                  label={t('Plain password')}
                  placeholder={t('Plain password')}
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
            <Controller
              name='userAgreementConfirmation'
              control={control}
              render={({ field: { value, ...rest }, fieldState: { error } }) => (
                <Checkbox
                  {...rest}
                  label={
                    <span>
                      {`${t('I agree with')} ${t('the')} `}
                      <Link href='/termservice'>
                        <a target='_blank' rel='noreferrer'>
                          {t('Terms of Service')}
                        </a>
                      </Link>
                      {` ${t('and')} ${t('the')} `}
                      <Link href='/termdataproccesing'>
                        <a target='_blank' rel='noreferrer'>
                          {t('Terms of Data Processing')}
                        </a>
                      </Link>
                    </span>
                  }
                  checked={value}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />

            <div className='w-full flex gap-[23px] justify-end'>
              <Button variant='text' className='!w-[85px]' onClick={onCloseRegistrationModal} data-testid='closeButton'>
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
