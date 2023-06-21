import { PLACEHOLDER_MOBILE_PHONE } from '@/shared/config'
import { useModalState } from '@/shared/hooks'
import { useTranslate, Form, notify } from '@/shared/lib'
import { Button, Input, Textarea, TypeMobilePhone } from '@/shared/ui'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { RequestCallback, callbackSchema } from '../../lib'
import { callbackModalAtom, useCallbackRequest } from '../../model'

export const CallbackForm: FC = () => {
  const { t } = useTranslate(['common'])
  const { onClose } = useModalState(callbackModalAtom)
  const { mutate, isLoading } = useCallbackRequest({
    onSuccess: () => {
      onClose()
      notify(t('callbackNotify'))
    },
    onError: () => {
      notify(t('serverErrorMessage'), { status: 'error' })
    },
  })
  return (
    <div className='max-w-[500px] w-full flex flex-col gap-[23px]'>
      <h1 className='croogla-secondary-text'>{t('callback')}</h1>
      <p className='source-text text-text'>{t('descriptionCallback')}</p>
      <Form<Omit<RequestCallback, 'currentLink'>>
        validationSchema={callbackSchema(t)}
        onSubmit={data => mutate({ ...data, currentLink: window.location.href })}
        formParams={{ mode: 'onChange' }}
        className='flex flex-col gap-base'
      >
        {({ formState: { isValid }, control }) => (
          <>
            <Controller
              name='phone'
              control={control}
              render={({ field, formState: { errors } }) => (
                <Input<TypeMobilePhone>
                  type='tel'
                  placeholder={PLACEHOLDER_MOBILE_PHONE}
                  label={t('phoneNumber')}
                  error={!!errors.phone}
                  errorMessage={errors.phone?.message}
                  {...field}
                />
              )}
            />
            <Textarea name='comment' label={t('Comment')} />
            <div className='w-full flex gap-[23px] mt-[23px] justify-end'>
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
                {t('send')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}
