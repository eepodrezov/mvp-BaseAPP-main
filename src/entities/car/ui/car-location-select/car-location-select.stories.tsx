import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarLocationSelect } from './car-location-select'

export default {
  title: 'Entities/Car/CarLocationSelect',
  component: CarLocationSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarLocationSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
