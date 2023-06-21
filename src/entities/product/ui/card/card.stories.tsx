import { Story, Meta } from '@storybook/react'
import { Card, CardProps } from './card'

export default {
  title: 'Entities/Product/Card',
  component: Card,
  argTypes: {
  },
  args: {
  },
} as Meta

const Template: Story<CardProps> = args => <Card {...args} />

export const Default = Template.bind({})
Default.args = {}
