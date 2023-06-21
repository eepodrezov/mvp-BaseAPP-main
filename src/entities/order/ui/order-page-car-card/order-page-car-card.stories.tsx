import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { OrderPageCarCard, OrderPageCarCardProps } from './order-page-car-card'

export default {
  title: 'Entities/car/OrderPageCarCard',
  component: OrderPageCarCard,
  args: { car: mock(CAR_ENTITY_MOCK) },
} as Meta

const Template: Story<OrderPageCarCardProps> = args => <OrderPageCarCard {...args} />

export const Default = Template.bind({})
Default.args = {}
