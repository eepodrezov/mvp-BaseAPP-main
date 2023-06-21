import { registrationPhoneAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { NotificationModal } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { confirmPhoneModalAtom } from '../model'
import { ConfirmRegistrationPhone } from './confirm-registration-phone'

export default {
  title: 'Features/ConfirmRegistrationPhone',
  component: ConfirmRegistrationPhone,
  parameters: {
    jotai: {
      atoms: {
        phoneAfterRegistration: registrationPhoneAtom,
      },
      values: {
        phoneAfterRegistration: '89999999999',
      },
    },
  },
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(confirmPhoneModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpen}>
        Confirm Phone Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ConfirmRegistrationPhone {...args} />
      </Modal>
      <NotificationModal />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
