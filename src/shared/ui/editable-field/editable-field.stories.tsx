import { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { EditableField, EditableFieldProps } from './editable-field'
import { Input, SelectSearch } from '@/shared/ui'
import { Nullable, SelectOption } from '@/shared/@types'

export default {
  title: 'Shared/EditableField',
  component: EditableField,
  args: {
    label: 'Header',
    name: 'name',
    options: [
      { id: 1, label: 'Durwakld Reynolds' },
      { id: 2, label: 'Kenton Towne' },
      { id: 3, label: 'Therese Wunsch' },
      { id: 4, label: 'Benedict Kessler' },
      { id: 5, label: 'Katelyn Rohan' },
    ],
  },
  argTypes: {
    isSmallVariant: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

interface TemplateStory extends EditableFieldProps {
  storyType: 'search' | 'input' | 'tel' | 'email'
  options: SelectOption[]
}

const Template: Story<TemplateStory> = args => {
  const [value, setValue] = useState<Nullable<string | number>>(null)

  const [currOptions, setCurrOptions] = useState<SelectOption[]>(args.options || [])

  function onSearch(value: string) {
    if (!value) setCurrOptions(args.options || [])
    const res = [] as SelectOption[]
    args?.options?.forEach(
      (option: SelectOption) => option.label.toLowerCase().includes(value.toLowerCase()) && res.push(option)
    )
    setCurrOptions(res)
  }

  return (
    <EditableField value={value} type={args.storyType} onChange={setValue} {...args}>
      {args.storyType === 'search' ? (
        <SelectSearch options={currOptions} name='editable-field-story' onChange={setValue} onSearch={onSearch} />
      ) : (
        <Input type={args.storyType} />
      )}
    </EditableField>
  )
}

export const InputType = Template.bind({})
InputType.args = {
  storyType: 'input',
}

export const SelectType = Template.bind({})
SelectType.args = {
  storyType: 'search',
}

export const PhoneType = Template.bind({})
PhoneType.args = {
  storyType: 'tel',
  fieldWithoutForm: true,
  errorMessage: 'Invalid Phone',
}
