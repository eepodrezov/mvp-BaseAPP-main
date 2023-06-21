import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { RangeInput, RangeInputProps } from './range-input'

export default {
  title: 'Shared/RangeInput',
  component: RangeInput,
  argTypes: {
    min: { control: 'number', defaultValue: 0 },
    max: { control: 'number', defaultValue: 1000 },
  },
  args: {
    name: 'Storybook-range-input',
  },
} as Meta

const Template: Story<RangeInputProps> = args => {
  const [value, setValue] = useState<number[]>()

  return <RangeInput value={value} onChange={setValue} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
