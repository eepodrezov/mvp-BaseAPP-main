import { Story, Meta } from '@storybook/react'
import { OrderPageView } from './order-page-view'

export default {
  title: 'Views/Orders/Order',
  component: OrderPageView,
} as Meta

const Template: Story = args => <OrderPageView {...args} />

export const Default = Template.bind({})
Default.args = {}
