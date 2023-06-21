import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { CarDescription, CarDescriptionProps } from './car-description'

export default {
  title: 'Entities/Car/CarDescription',
  component: CarDescription,
  args: {
    car: mock(CAR_ENTITY_MOCK),
  },
} as Meta

const Template: Story<CarDescriptionProps> = args => <CarDescription {...args} />

export const Default = Template.bind({})
Default.args = {}
