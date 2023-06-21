import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarMileageRange } from './car-mileage-range'

export default {
  title: 'Entities/Car/CarMileageRange',
  component: CarMileageRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarMileageRange {...args} />

export const Default = Template.bind({})
Default.args = {}
