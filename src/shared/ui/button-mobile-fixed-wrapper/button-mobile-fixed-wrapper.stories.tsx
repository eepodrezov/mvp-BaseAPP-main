import { Story, Meta } from '@storybook/react'
import { ButtonMobileFixedWrapper, ButtonMobileFixedWrapperProps } from './button-mobile-fixed-wrapper'

export default {
  title: 'Shared/ButtonFixedWrapper',
  component: ButtonMobileFixedWrapper,
} as Meta

const Template: Story<ButtonMobileFixedWrapperProps> = args => <ButtonMobileFixedWrapper {...args} />

export const Default = Template.bind({})
Default.args = {}
