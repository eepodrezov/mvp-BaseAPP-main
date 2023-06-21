import { ORDER_CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { OrderCarCard, OrderCarCardProps } from './order-car-card'

export default {
  title: 'Entities/Order/Car',
  component: OrderCarCard,
  args: {
    car: mock(ORDER_CAR_ENTITY_MOCK),
  },
} as Meta

const Template: Story<OrderCarCardProps> = args => (
  <div className='flex flex-col gap-[15px]'>
    <OrderCarCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
