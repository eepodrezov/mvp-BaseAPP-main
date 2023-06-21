import { Button } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { Tooltip, TooltipProps } from './tooltip'

export default {
  title: 'Shared/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: 'select', options: ['right', 'top', 'bottom', 'left'] },
    isActive: { control: 'boolean', defaultValue: true },
  },
  args: {
    label: 'Test Storybook tooltip',
  },
  decorators: [
    Story => (
      <div className='flex justify-center p-12'>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<TooltipProps> = args => {
  return (
    <Tooltip {...args}>
      <Button>Storybook-Tooltip</Button>
    </Tooltip>
  )
}

export const Default = Template.bind({})
Default.args = {}
