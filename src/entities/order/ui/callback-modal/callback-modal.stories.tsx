import { Story, Meta } from '@storybook/react'

import { CallbackModal } from './callback-modal'

export default {
  title: 'Entities/Order/CallbackModal',
  component: CallbackModal,
} as Meta

const Template: Story = args => <CallbackModal {...args} />

export const Default = Template.bind({})
Default.args = {}
