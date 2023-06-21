import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './button'
import UserIcon from '@/shared/assets/icons/common/user.svg'

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
      defaultValue: 'primary',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Кнопка</Button>
const IconTemplate: Story<ButtonProps> = args => (
  <Button {...args}>
    <UserIcon className='fill-currentColor' />
  </Button>
)

export const Default = Template.bind({})
Default.args = {}

export const Icon = IconTemplate.bind({})
Icon.args = {
  variant: 'icon',
}

export const BorderedIcon = IconTemplate.bind({})
BorderedIcon.args = {
  variant: 'bordered-icon',
}
