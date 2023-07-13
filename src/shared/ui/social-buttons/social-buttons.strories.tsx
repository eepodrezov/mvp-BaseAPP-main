import { Story, Meta } from '@storybook/react'
import { SocialButtons } from './social-buttons'

const Template: Story = args => {
  return <SocialButtons {...args} />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'Shared/SocialButtons',
  component: SocialButtons,
} as Meta
