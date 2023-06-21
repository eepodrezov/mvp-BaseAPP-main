import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarDealerSelect } from './car-dealer-select'

export default {
  title: 'Entities/Car/CarDealerSelect',
  component: CarDealerSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarDealerSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
