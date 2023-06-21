import { viewerAtom } from '@/entities/viewer'
import { confirmEmailModalAtom, confirmPhoneModalAtom, registrationEmailAtom, registrationPhoneAtom } from '@/features'
import { Nullable, TFunction } from '@/shared/@types'
import { PLACEHOLDER_MOBILE_PHONE } from '@/shared/config'
import { getStringWithPhoneMask } from '@/shared/helpers'
import { useModalState, useWindowDimensions } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button, EditableField, Input, TypeMobilePhone } from '@/shared/ui'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import { serverSideValidationPrivateInfo } from '../lib'
import { useChangePrivateInfo } from '../model'

export const ChangePrivateInfo: FC = () => {
  const { t } = useTranslate(['profile', 'common'])

  const [viewer, setViewer] = useAtom(viewerAtom)

  const { mutate, isLoading } = useChangePrivateInfo({
    onSuccess: data => {
      setViewer(data)
      if (data.isEmailConfirmed) onOpenConfirmPhoneModal()
      if (data.isPhoneConfirmed) onOpenConfirmEmailModal()
      // TODO:Добавить как будет известно
      // if (data.isTelegramConfirmed)
    },
    onError: error => serverSideValidationPrivateInfo(t, error),
  })
  const [phone, setPhone] = useState(viewer?.phone || '')

  const [email, setEmail] = useState(viewer?.email || '')

  // Возможно понадобится в будущем
  // const [telegram, setTelegram] = useState(viewer?.telegram || '')

  useWindowDimensions()

  const { onOpen: onOpenConfirmEmailModal } = useModalState(confirmEmailModalAtom)

  const setEmailAfterUpdate = useUpdateAtom(registrationEmailAtom)

  const { onOpen: onOpenConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)

  const setPhoneAfterUpdate = useUpdateAtom(registrationPhoneAtom)

  return (
    <div className='grid grid-cols-[repeat(auto-fit,200px)] gap-large'>
      <EditableField
        isSmallVariant
        label={t('common:phoneNumber')}
        disabled={isLoading}
        type='tel'
        fieldWithoutForm
        errorMessage={t('common:InvalidPhone')}
        emptyText={t('common:Empty')}
        onChange={(e: Nullable<string | number>) => setPhone(e as string)}
        value={phone}
        isEditable={!viewer?.isPhoneConfirmed}
        formatter={value => getStringWithPhoneMask(String(value))}
        {...(!viewer?.isPhoneConfirmed &&
          phone && {
            childrenClassName: 'flex flex-col gap-small',
            extraContent: (
              <ExtraContentBlock
                disabled={isLoading}
                t={t}
                onClick={() => {
                  setPhoneAfterUpdate(phone)
                  mutate({ id: viewer!.id, isRepeat: true, phone })
                }}
                text={t('common:phoneNumber').toLowerCase()}
              />
            ),
          })}
      >
        <Input<TypeMobilePhone> type='tel' placeholder={PLACEHOLDER_MOBILE_PHONE} />
      </EditableField>
      <EditableField
        isSmallVariant
        label={t('Email')}
        disabled={isLoading}
        value={email}
        fieldWithoutForm
        {...(window.innerWidth > 680 && { withTruncate: true, maxWidth: 150 })}
        name='email'
        type='email'
        errorMessage={t('common:InvalidMail')}
        emptyText={t('common:Empty')}
        onChange={(e: Nullable<string | number>) => setEmail(e as string)}
        isEditable={!viewer?.isEmailConfirmed}
        {...(!viewer?.isEmailConfirmed &&
          email && {
            childrenClassName: 'flex flex-col gap-small',
            extraContent: (
              <ExtraContentBlock
                disabled={isLoading}
                t={t}
                onClick={() => {
                  setEmailAfterUpdate(email)
                  mutate({ id: viewer!.id, isRepeat: true, email })
                }}
                text={t('common:EmailSecondary').toLowerCase()}
              />
            ),
          })}
      >
        <Input />
      </EditableField>
      {/* Понадобится в будущем */}
      {/* <EditableField
        isSmallVariant
        label={t('Telegram')}
        value={telegram}
        name='telegram'
        type='input'
        {...(window.innerWidth > 680 && { withTruncate: true, maxWidth: 150 })}
        disabled={isLoading}
        emptyText={t('common:Empty')}
        onChange={(e: Nullable<string | number>) => setTelegram(e as string)}
        isEditable={!viewer?.isTelegramConfirmed}
        {...(!viewer?.isTelegramConfirmed &&
          telegram && {
            childrenClassName: 'flex flex-col gap-small',
            extraContent: (
              <ExtraContentBlock
                t={t}
                disabled={isLoading}
                onClick={() => mutate({ id: viewer!.id, isRepeat: true, telegram })}
                text={t('telegram').toLowerCase()}
              />
            ),
          })}
      >
        <Input />
      </EditableField> */}
    </div>
  )
}

interface ExtraContentBlockProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  t: TFunction
  text: string
  disabled?: boolean
}

const ExtraContentBlock: FC<ExtraContentBlockProps> = ({ text, disabled, t, onClick }) => (
  <div className='flex flex-col gap-small'>
    <p className='source-mobile-text desktop:source-text text-red'>
      {t('Please confirm')} {text}
    </p>
    <Button variant='secondary' className='max-desktop:w-[150px]' onClick={onClick} disabled={disabled}>
      {t('common:Confirm')}
    </Button>
  </div>
)
