import { Story, Meta } from '@storybook/react'
import { OrderStatusCard, OrderStatusCardProps } from './order-status-card'

export default {
  title: 'Entities/Order/OrderStatusCard',
  component: OrderStatusCard,
  args: {
    orderId: 15,
  },
} as Meta

const Template: Story<OrderStatusCardProps> = args => <OrderStatusCard {...args} />

export const Default = Template.bind({})
Default.args = {}
