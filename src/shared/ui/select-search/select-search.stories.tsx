import { Nullable, SelectOption } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { SelectSearch, SelectSearchProps } from './select-search'

export default {
  title: 'Shared/SelectSearch',
  component: SelectSearch,
  args: {
    options: [
      { id: 1, label: 'Durward Reynolds' },
      { id: 2, label: 'Kenton Towne' },
      { id: 3, label: 'Therese Wunsch' },
      { id: 4, label: 'Benedict Kessler' },
      { id: 5, label: 'Katelyn Rohan' },
    ],
    className: 'max-w-sm',
    label: 'StorySelectSearch',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

const Template: Story<SelectSearchProps<number>> = args => {
  const [value, onChange] = useState<Nullable<number>>(null)
  const [currOptions, setCurrOptions] = useState<SelectOption[]>(args.options || [])

  function onSearch(value: string) {
    if (!value) setCurrOptions(args.options || [])
    const res = [] as SelectOption[]
    args?.options?.forEach(
      (option: SelectOption) => option.label.toLowerCase().includes(value.toLowerCase()) && res.push(option)
    )
    setCurrOptions(res)
  }
  return <SelectSearch {...args} value={value} options={currOptions} onChange={onChange} onSearch={onSearch} />
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
