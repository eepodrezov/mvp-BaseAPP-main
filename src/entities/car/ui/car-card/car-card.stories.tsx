import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { CarCard, CarCardProps } from './car-card'

export default {
  title: 'Entities/Car/CarCard',
  component: CarCard,
  argTypes: {
    type: { control: 'select', options: ['catalog', 'page'], defaultValue: 'catalog' },
  },
  args: {
    car: mock(CAR_ENTITY_MOCK),
  },
} as Meta

const Template: Story<CarCardProps> = args => <CarCard {...args} />

export const Default = Template.bind({})
Default.args = {}
