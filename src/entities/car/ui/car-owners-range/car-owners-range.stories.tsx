import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarOwnersRange } from './car-owners-range'

export default {
  title: 'Entities/Car/CarOwnersRange',
  component: CarOwnersRange,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarOwnersRange {...args} />

export const Default = Template.bind({})
Default.args = {}
