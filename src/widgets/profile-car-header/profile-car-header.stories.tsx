import { Story, Meta } from '@storybook/react'
import { ProfileCarHeader, ProfileCarHeaderProps } from './profile-car-header'

export default {
  title: 'Widgets/ProfileCarHeader',
  component: ProfileCarHeader,
} as Meta

const Template: Story<ProfileCarHeaderProps> = args => <ProfileCarHeader {...args} />

export const Default = Template.bind({})
Default.args = {}
