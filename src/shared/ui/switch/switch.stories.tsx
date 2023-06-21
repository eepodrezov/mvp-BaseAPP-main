import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Switch, SwitchProps } from './switch'

export default {
  title: 'Shared/Switch',
  component: Switch,
  args: {
    name: 'Storybook-switch',
  },
} as Meta

const Template: Story<SwitchProps> = args => {
  const [checked, setChecked] = useState(false)

  return <Switch {...args} value={checked} onChange={setChecked} />
}

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Storybook-switch',
}
