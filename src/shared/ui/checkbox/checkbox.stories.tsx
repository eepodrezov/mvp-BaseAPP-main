import { Story, Meta } from '@storybook/react'
import { Checkbox, CheckboxProps } from './checkbox'

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
  args: {
    name: 'storybookCheckbox',
    label: 'Получать рассылку на e-mail',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  errorMessage: 'Error text',
}
