import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarDriveTypeSelect } from './car-drive-type-select'

export default {
  title: 'Entities/Car/CarDriveTypeSelect',
  component: CarDriveTypeSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarDriveTypeSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
