import { registrationEmailAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { confirmEmailModalAtom } from '../model'
import { ConfirmEmail } from './confirm-email'

export default {
  title: 'Features/ConfirmEmail',
  component: ConfirmEmail,
  parameters: {
    jotai: {
      atoms: {
        emailAfterRegistration: registrationEmailAtom,
      },
      values: {
        emailAfterRegistration: 'test@mail.ru',
      },
    },
  },
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(confirmEmailModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpen}>
        Confirm Email Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ConfirmEmail {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
