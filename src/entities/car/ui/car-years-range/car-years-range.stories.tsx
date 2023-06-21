import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarYearsRange } from './car-years-range'

export default {
  title: 'Entities/Car/CarYearsRange',
  component: CarYearsRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarYearsRange {...args} />

export const Default = Template.bind({})
Default.args = {}
