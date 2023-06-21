import { Story, Meta } from '@storybook/react'
import { ButtonHTMLAttributes } from 'react'
import { ChangeLanguageButton } from './change-language-button'

export default {
  title: 'Features/ChangeLanguageButton',
  component: ChangeLanguageButton,
} as Meta

const Template: Story<ButtonHTMLAttributes<HTMLButtonElement>> = args => <ChangeLanguageButton {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
