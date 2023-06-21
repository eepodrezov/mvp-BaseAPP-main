import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarEngineVolumeRange } from './car-engine-volume-range'

export default {
  title: 'Entities/Car/CarEngineVolumeRange',
  component: CarEngineVolumeRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarEngineVolumeRange {...args} />

export const Default = Template.bind({})
Default.args = {}
