import { useModalState } from '@/shared/hooks'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { confirmedModalAtom } from '../model'
import { Confirmed } from './confirmed'

export default {
  title: 'Features/Confirmed',
  component: Confirmed,
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(confirmedModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpen}>
        Confirmed Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Confirmed {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
