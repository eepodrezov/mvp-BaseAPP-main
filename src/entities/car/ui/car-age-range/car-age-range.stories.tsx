import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarAgeRange } from './car-age-range'

export default {
  title: 'Entities/Car/CarAgeRange',
  component: CarAgeRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarAgeRange {...args} />

export const Default = Template.bind({})
Default.args = {}
