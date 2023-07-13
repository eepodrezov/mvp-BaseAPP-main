import {
  confirmEmailModalAtom,
  ConfirmEmail,
  signInModalAtom,
  BasicAuthForm,
  confirmPhoneModalAtom,
  ConfirmPhone,
  confirmedModalAtom,
  Confirmed,
} from '@/features'
import { useModalState } from '@/shared/hooks'
import { NotificationModal, useTranslate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { registrationModalAtom } from '../model'
import { Registration } from './registration'

export default {
  title: 'Features/Registration',
  component: Registration,
} as Meta

const Template: Story = args => {
  const { t } = useTranslate(['common'])
  const {
    isOpen: isOpenRegistrationModal,
    onOpen: onOpenRegistrationModal,
    onClose: onCloseRegistrationModal,
  } = useModalState(registrationModalAtom)
  const { isOpen: isOpenSignInModal, onClose: onCloseSignInModal } = useModalState(signInModalAtom)
  const { isOpen: isOpenConfirmEmailModal, onClose: onCloseConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const { isOpen: isOpenConfirmPhoneModal, onClose: onCloseConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)
  const { isOpen: isOpenConfirmedRegistrationModal, onClose: onCloseConfirmedRegistrationModal } =
    useModalState(confirmedModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpenRegistrationModal}>
        {t('signUp')}
      </Button>
      <Modal isOpen={isOpenRegistrationModal} onClose={onCloseRegistrationModal} className='overflow-hidden'>
        <Registration {...args} />
      </Modal>
      <Modal isOpen={isOpenSignInModal} onClose={onCloseSignInModal}>
        <BasicAuthForm />
      </Modal>
      <Modal isOpen={isOpenConfirmEmailModal} onClose={onCloseConfirmEmailModal}>
        <ConfirmEmail />
      </Modal>
      <Modal isOpen={isOpenConfirmPhoneModal} onClose={onCloseConfirmPhoneModal}>
        <ConfirmPhone />
      </Modal>
      <Modal isOpen={isOpenConfirmedRegistrationModal} onClose={onCloseConfirmedRegistrationModal}>
        <Confirmed />
      </Modal>
      <NotificationModal />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
