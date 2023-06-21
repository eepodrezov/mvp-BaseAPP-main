import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarFuelTypeSelect } from './car-fuel-type-select'

export default {
  title: 'Entities/Car/CarFuelTypeSelect',
  component: CarFuelTypeSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarFuelTypeSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
