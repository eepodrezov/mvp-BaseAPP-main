import { Story, Meta } from '@storybook/react'
import { BookingView } from './booking-view'

export default {
  title: 'Views/BookingView',
  component: BookingView,
} as Meta

const Template: Story = args => <BookingView {...args} />

export const Default = Template.bind({})
Default.args = {}
