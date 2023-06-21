import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { WhatIsBooking } from './what-is-booking'

export default {
  title: 'Features/WhatIsBooking',
  component: WhatIsBooking,
} as Meta

const Template: Story<PropsWithClassName> = args => <WhatIsBooking {...args} />

export const Default = Template.bind({})
Default.args = {}
