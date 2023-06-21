import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarConfigurationSelect } from './car-configuration-select'

export default {
  title: 'Entities/Car/CarConfigurationSelect',
  component: CarConfigurationSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarConfigurationSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
