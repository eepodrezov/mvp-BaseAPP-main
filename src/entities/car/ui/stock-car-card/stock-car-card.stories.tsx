import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { StockCarCard, StockCarCardProps } from './stock-car-card'

export default {
  title: 'Entities/car/StockCarCard',
  args: { car: mock(CAR_ENTITY_MOCK) },
  component: StockCarCard,
} as Meta

const Template: Story<StockCarCardProps> = args => <StockCarCard {...args} />

export const Default = Template.bind({})
Default.args = {}
