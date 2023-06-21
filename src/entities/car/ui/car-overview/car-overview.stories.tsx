import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { CarOverview, CarOverviewProps } from './car-overview'

export default {
  title: 'Entities/Car/CarOverview',
  component: CarOverview,
  argTypes: {},
  args: {
    car: mock(CAR_ENTITY_MOCK),
  },
} as Meta

const Template: Story<CarOverviewProps> = args => <CarOverview {...args} />

export const Default = Template.bind({})
Default.args = {}
