import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarBodyTypeSelect } from './car-body-type-select'

export default {
  title: 'Entities/Car/CarBodyTypeSelect',
  component: CarBodyTypeSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarBodyTypeSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
