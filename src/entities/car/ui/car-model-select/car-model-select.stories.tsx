import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarModelSelect } from './car-model-select'

export default {
  title: 'Entities/Car/CarModelSelect',
  component: CarModelSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarModelSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
