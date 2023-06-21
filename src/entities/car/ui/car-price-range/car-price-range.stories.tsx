import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarPriceRange } from './car-price-range'

export default {
  title: 'Entities/Car/CarPriceRange',
  component: CarPriceRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarPriceRange {...args} />

export const Default = Template.bind({})
Default.args = {}
