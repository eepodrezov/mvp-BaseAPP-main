import { Story, Meta } from '@storybook/react'
import { Textarea, TextareaProps } from './textarea'
import { Form, notify, Upload } from '@/shared/lib'

export default {
  title: 'Shared/Textarea',
  component: Textarea,
  args: {
    name: 'Header',
    label: 'Header',
    errorMessage: 'Заполните это поле',
  },
  argTypes: {
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<TextareaProps> = args => {
  if (args.error && !args.children) return <Textarea {...args} />
  else
    return (
      <Form
        onSubmit={() => {
          notify('Успешно')
        }}
      >
        <Textarea {...args} />
      </Form>
    )
}

export const Default = Template.bind({})
Default.args = {}

export const WithChildren = Template.bind({})
WithChildren.args = {
  children: <Upload />,
}
