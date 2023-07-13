import { Story, Meta } from '@storybook/react'
import { PasswordRecoveryPasswords } from './password-recovery-passwords'
import { Button, Modal } from '@/shared/ui'
import { passwordRecoveryPasswordsModalAtom } from '../../model'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'

export default {
  title: 'Entities/Viewer/PasswordRecoveryPasswords',
  component: PasswordRecoveryPasswords,
} as Meta

const Template: Story = args => {
  const { t } = useTranslate(['common'])
  const { isOpen, onClose, onOpen } = useModalState(passwordRecoveryPasswordsModalAtom)
  return (
    <>
      <Button onClick={onOpen}>{t('Password_recovery')}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <PasswordRecoveryPasswords {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
