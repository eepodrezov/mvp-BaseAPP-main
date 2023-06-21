import { Story, Meta } from '@storybook/react'
import { ProfilePageNavbar } from './profile-page-navbar'

export default {
  title: 'Widgets/ProfilePageNavbar',
  component: ProfilePageNavbar,
} as Meta

const Template: Story = args => {
  return <ProfilePageNavbar {...args} />
}

export const Default = Template.bind({})
Default.args = {}
