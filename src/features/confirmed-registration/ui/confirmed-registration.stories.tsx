import { useModalState } from '@/shared/hooks'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { confirmedRegistrationModalAtom } from '../model'
import { ConfirmedRegistration } from './confirmed-registration'

export default {
  title: 'Features/ConfirmedRegistration',
  component: ConfirmedRegistration,
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(confirmedRegistrationModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpen}>
        Confirmed Registration Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ConfirmedRegistration {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
