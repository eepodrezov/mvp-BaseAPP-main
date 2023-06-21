import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { RangeSelect, RangeSelectProps } from './range-select'

export default {
  title: 'Shared/RangeSelect',
  component: RangeSelect,
  argTypes: {
    min: { control: 'number', defaultValue: 0 },
    max: { control: 'number', defaultValue: 1000 },
  },
  args: {
    name: 'Storybook-range-input',
    min: 500000,
    max: 5646000,
  },
} as Meta

const Template: Story<RangeSelectProps> = args => {
  const [value, setValue] = useState<number[]>()

  return <RangeSelect value={value} onChange={setValue} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
