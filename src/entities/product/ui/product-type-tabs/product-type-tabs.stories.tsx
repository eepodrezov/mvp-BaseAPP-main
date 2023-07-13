import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarTypeTabs } from './product-type-tabs'

export default {
  title: 'Entities/Car/CarTypeTabs',
  component: CarTypeTabs,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarTypeTabs {...args} />

export const Default = Template.bind({})
Default.args = {}
