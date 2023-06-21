import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarManufacturerCountrySelect } from './car-manufacturer-country-select'

export default {
  title: 'Entities/Car/CarManufacturerCountrySelect',
  component: CarManufacturerCountrySelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarManufacturerCountrySelect {...args} />

export const Default = Template.bind({})
Default.args = {}
