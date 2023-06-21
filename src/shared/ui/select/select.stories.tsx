import { Nullable } from '@/shared/@types'
import { Story, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Select, SelectProps } from './select'

export default {
  title: 'Shared/Select',
  component: Select,
  args: {
    label: 'Заголовок',
    t: (str: string) => str,
    options: [
      { id: 1, label: 'Durward Reynolds' },
      { id: 2, label: 'Kenton Towne' },
      { id: 3, label: 'Therese Wunsch' },
      { id: 4, label: 'Benedict Kessler' },
      { id: 5, label: 'Katelyn Rohan' },
    ],
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Select>

const Template: Story<SelectProps<Nullable<number>>> = args => {
  const [value, setValue] = useState<Nullable<number>>(null)

  return <Select {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {}

export const Empty = Template.bind({})
Empty.args = {
  options: [],
}

export const WithError = Template.bind({})
WithError.args = {
  inputProps: {
    error: true,
    errorMessage: 'StorySelectSearchError',
  },
}
