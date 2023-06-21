import { Story, Meta } from '@storybook/react'
import { BookingPayment, BookingPaymentProps } from './booking-payment'

export default {
  title: 'Features/BookingPayment',
  component: BookingPayment,
} as Meta

const Template: Story<BookingPaymentProps> = args => <BookingPayment {...args} />

export const Default = Template.bind({})
Default.args = {}
