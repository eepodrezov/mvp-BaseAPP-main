import { viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { OrdersTab } from './orders-tab'

export default {
  title: 'Views/Tabs/OrdersTab',
  component: OrdersTab,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          id: 1,
        },
      },
    },
  },
} as Meta

const Template: Story = args => {
  return <OrdersTab {...args} />
}

export const Default = Template.bind({})
Default.args = {}
