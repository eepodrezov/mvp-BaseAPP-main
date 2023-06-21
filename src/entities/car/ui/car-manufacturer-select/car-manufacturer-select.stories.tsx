import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarManufacturerSelect } from './car-manufacturer-select'

export default {
  title: 'Entities/Car/CarManufacturerSelect',
  component: CarManufacturerSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarManufacturerSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
