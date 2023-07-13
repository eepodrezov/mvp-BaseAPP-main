import { Story, Meta } from '@storybook/react'
import { ProfileLayout } from './profile-layout'

export default {
  title: 'Layouts/ProfileLayout',
  component: ProfileLayout,
} as Meta

const Template: Story = args => <ProfileLayout {...args} />

export const Default = Template.bind({})
Default.args = {}
