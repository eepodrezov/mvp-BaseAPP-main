import { Story, Meta } from '@storybook/react'
import { OrderDocs, OrderDocsProps } from './order-docs'

export default {
  title: 'Entities/Order/OrderDocs',
  component: OrderDocs,
  args: {
    paymentInstruction: 'test',
    paymentInvoice: 'test',
  },
} as Meta

const Template: Story<OrderDocsProps> = args => <OrderDocs {...args} />

export const Default = Template.bind({})
Default.args = {}
