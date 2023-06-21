import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarEnginePowerRange } from './car-engine-power-range'

export default {
  title: 'Entities/Car/CarEnginePowerRange',
  component: CarEnginePowerRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarEnginePowerRange {...args} />

export const Default = Template.bind({})
Default.args = {}
