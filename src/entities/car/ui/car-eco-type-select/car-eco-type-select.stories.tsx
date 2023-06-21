import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarEcoTypeSelect } from './car-eco-type-select'

export default {
  title: 'Entities/Car/CarEcoTypeSelect',
  component: CarEcoTypeSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarEcoTypeSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
