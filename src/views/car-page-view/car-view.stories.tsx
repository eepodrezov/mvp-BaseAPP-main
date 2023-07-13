import { Story, Meta } from '@storybook/react'
import { CarPageView } from './car-page-view'
import { mock } from 'mockjs'
import { CAR_ENTITY_MOCK } from '@/shared/config'

export default {
  title: 'Views/Car/Car',
  component: CarPageView,
  args: {
    car: mock(CAR_ENTITY_MOCK),
  },
} as Meta

const Template: Story = args => {
  return <CarPageView {...args} />
}

export const Default = Template.bind({})
Default.args = {}
