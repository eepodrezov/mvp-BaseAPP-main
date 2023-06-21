import { Story, Meta } from '@storybook/react'
import { NotificationModal } from './notification-modal'
import { notificationModalData } from './store'

export default {
  title: 'Shared/NotificationModal',
  component: NotificationModal,
  parameters: {
    jotai: {
      atoms: {
        data: notificationModalData,
      },
      values: {
        data: { payload: 'texttexttexttext' },
      },
    },
  },
} as Meta

const Template: Story = args => <NotificationModal {...args} />

export const Default = Template.bind({})
Default.args = {}
