import { viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { Form, notify, useTranslate } from '@/shared/lib'
import { Input, Button } from '@/shared/ui'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { changePasswordSchema, FieldsChangePassword, serverSideChangePasswordValidation } from '../lib'
import { changePasswordModalAtom, useChangePassword } from '../model'

export const ChangePassword: FC = () => {
  const { t } = useTranslate(['profile', 'common'])
  const { onClose } = useModalState(changePasswordModalAtom)
  const viewer = useAtomValue(viewerAtom)

  const { mutate } = useChangePassword({
    onSuccess: () => {
      onClose()
      notify(t('Password changed successfully'))
    },
    onError: error => serverSideChangePasswordValidation(t, error),
  })
  if (!viewer) return null

  return (
    <div className='flex flex-col desktop:w-[500px] w-full gap-[23px] select-none'>
      <h1 className='croogla-secondary-text'>{t('Change password')}</h1>
      <p className='source-text text-text'>{t('Enter your current password and create new password')}</p>
      <Form<FieldsChangePassword>
        validationSchema={changePasswordSchema(t)}
        onSubmit={({ oldPassword, newPassword, repeatPassword }) =>
          mutate({ id: viewer.id, oldPassword, repeatPassword, newPassword })
        }
        formParams={{ mode: 'onChange', shouldUnregister: true }}
      >
        {({ isLoading, formState: { isValid } }) => (
          <div className='flex flex-col gap-[23px]'>
            <Input
              name='oldPassword'
              label={t('Current password')}
              placeholder={t('Current password')}
              type='password'
            />
            <Input
              name='newPassword'
              label={t('New password')}
              placeholder={t('New password')}
              type='password'
              passwordStrength
            />
            <Input
              name='repeatPassword'
              label={t('common:RepeatPassword')}
              placeholder={t('common:RepeatPassword')}
              type='password'
              passwordStrength
            />
            <div className='w-full flex gap-[23px] justify-end'>
              <Button variant='text' className='!w-[85px]' onClick={onClose}>
                {t('common:cancel')}
              </Button>
              <Button
                type='submit'
                className='!w-[176px]'
                disabled={!isValid}
                loading={isLoading}
                data-testid='submitButton'
              >
                {t('common:Accept')}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
