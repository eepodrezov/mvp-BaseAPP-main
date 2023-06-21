import { Story, Meta } from '@storybook/react'
import { ButtonSocial, ButtonSocialProps } from './button-social'

export default {
  title: 'Shared/ButtonSocial',
  component: ButtonSocial,
  args: {
    link: '/',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['instagram', 'facebook', 'twitter', 'linkedin'],
      defaultValue: 'instagram',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<ButtonSocialProps> = args => <ButtonSocial {...args} />

export const Default = Template.bind({})
Default.args = {}
