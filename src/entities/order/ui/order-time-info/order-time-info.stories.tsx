import { Story, Meta } from '@storybook/react'
import { OrderTimeInfo, OrderTimeInfoProps } from './order-time-info'
import dayjs from 'dayjs'

export default {
  title: 'Entities/Order/OrderTimeInfo',
  component: OrderTimeInfo,
  args: {
    dateUpdate: dayjs().utc().subtract(3, 'h'),
    payTime: 300,
  },
} as Meta

const Template: Story<OrderTimeInfoProps> = args => <OrderTimeInfo {...args} />

export const Default = Template.bind({})
Default.args = {}
