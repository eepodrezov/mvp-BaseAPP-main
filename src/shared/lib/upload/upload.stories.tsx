import { Story, Meta } from '@storybook/react'
import { Form, notify } from '@/shared/lib'
import { Upload, UploadProps } from './upload'

export default {
  title: 'Shared/Upload',
  component: Upload,
  argTypes: {
    multiple: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
  },
} as Meta

const Template: Story<UploadProps> = args => (
  <Form
    onSubmit={() => {
      notify('Успешно')
    }}
  >
    <Upload {...args} />
  </Form>
)

export const Default = Template.bind({})
Default.args = {}
