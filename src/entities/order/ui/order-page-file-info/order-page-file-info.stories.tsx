import { Story, Meta } from '@storybook/react'
import { OrderPageFileInfo, OrderPageFileInfoProps } from './order-page-file-info'

export default {
  title: 'Entities/car/OrderPageFileInfo',
  component: OrderPageFileInfo,
} as Meta

const Template: Story<OrderPageFileInfoProps> = args => <OrderPageFileInfo {...args} />

export const Default = Template.bind({})
Default.args = {}
