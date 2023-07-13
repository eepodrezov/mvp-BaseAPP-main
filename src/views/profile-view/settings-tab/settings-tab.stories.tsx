import { Story, Meta } from '@storybook/react'
import { SettingsTab } from './settings-tab'

export default {
  title: 'Views/Tabs/SettingsTab',
  component: SettingsTab,
} as Meta

const Template: Story = args => <SettingsTab {...args} />

export const Default = Template.bind({})
Default.args = {}
