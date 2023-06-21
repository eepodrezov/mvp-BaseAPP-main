import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarTransmissionTypeSelect } from './car-transmission-type-select'

export default {
  title: 'Entities/Car/CarTransmissionTypeSelect',
  component: CarTransmissionTypeSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarTransmissionTypeSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
