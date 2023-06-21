import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarBrandSelect } from './car-brand-select'

export default {
  title: 'Entities/Car/CarBrandSelect',
  component: CarBrandSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarBrandSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
