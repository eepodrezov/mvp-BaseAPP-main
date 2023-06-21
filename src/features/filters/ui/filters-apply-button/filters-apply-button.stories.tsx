import { RangeInput } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { FiltersApplyButton } from './filters-apply-button'

export default {
  title: 'Features/FiltersApplyButton',
  component: FiltersApplyButton,
  argTypes: {
    placement: { control: 'select', options: ['right', 'top', 'bottom', 'left'] },
    isActive: { control: 'boolean', defaultValue: true },
  },
  decorators: [
    Story => (
      <div className='flex justify-center p-12'>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story = args => {
  const [value, setValue] = useState<number[]>([])
  return (
    <FiltersApplyButton {...args}>
      <RangeInput name='input' value={value} onChange={setValue} {...args} />
    </FiltersApplyButton>
  )
}

export const Default = Template.bind({})
Default.args = {}
