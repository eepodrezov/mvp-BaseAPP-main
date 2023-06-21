import { ChangeEvent, useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Input } from './input'
import Arrow from '@/shared/assets/icons/common/select-arrow.svg'
import { TypeMobilePhone } from './lib'

export default {
  title: 'Shared/Input',
  component: Input,
  args: {
    name: 'storyInput',
    errorMessage: 'Заполните это поле',
    type: 'text',
    label: 'Header',
    placeholder: 'Placeholder',
    className: 'max-w-[380px]',
  },
  argTypes: {
    withIcon: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    passwordStrength: {
      control: 'boolean',
      defaultValue: false,
    },
    type: {
      options: ['text', 'number', 'password', 'search'],
      control: { type: 'select' },
    },
  },
} as Meta

const Template: Story = args => {
  const [value, setValue] = useState<string>('')

  if (args.type === 'tel')
    return <Input<TypeMobilePhone> onChange={(event: string) => setValue(event as string)} value={value} {...args} />

  return (
    <Input onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)} value={value} {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const WithIcon = Template.bind({})
WithIcon.args = {
  suffixIcon: <Arrow className='stroke-black' />,
}
export const DefaultPhone = Template.bind({})
DefaultPhone.args = {
  inputMode: 'tel',
}
