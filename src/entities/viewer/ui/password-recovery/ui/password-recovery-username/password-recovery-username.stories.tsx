import { Story, Meta } from '@storybook/react'
import { PasswordRecoveryUsername } from './password-recovery-username'
import { useModalState } from '@/shared/hooks'
import { passwordRecoveryPasswordsModalAtom, passwordRecoveryUsernameModalAtom } from '../../model'
import { Button, Modal } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import { confirmEmailModalAtom, ConfirmEmail } from '@/features/confirm-email'
import { confirmPhoneModalAtom, ConfirmPhone } from '@/features/confirm-registration-phone'
import { confirmedModalAtom, Confirmed } from '@/features/confirmed'
import { PasswordRecoveryPasswords } from '../password-recovery-passwords'

export default {
  title: 'Entities/Viewer/PasswordRecoveryUsername',
  component: PasswordRecoveryUsername,
} as Meta

const Template: Story = args => {
  const { t } = useTranslate(['common'])
  const { isOpen, onClose, onOpen } = useModalState(passwordRecoveryUsernameModalAtom)
  const { isOpen: isOpenConfirmEmailModal, onClose: onCloseConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const { isOpen: isOpenConfirmPhoneModal, onClose: onCloseConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)
  const { isOpen: isOpenConfirmedRegistrationModal, onClose: onCloseConfirmedRegistrationModal } =
    useModalState(confirmedModalAtom)
  const { isOpen: isOpenRecoveryPasswordsModal, onClose: onCloseRecoveryPasswordsModal } = useModalState(
    passwordRecoveryPasswordsModalAtom
  )
  return (
    <>
      <Button onClick={onOpen}>{t('Password_recovery')}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <PasswordRecoveryUsername {...args} />
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
      <Modal isOpen={isOpenRecoveryPasswordsModal} onClose={onCloseRecoveryPasswordsModal}>
        <PasswordRecoveryPasswords />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
