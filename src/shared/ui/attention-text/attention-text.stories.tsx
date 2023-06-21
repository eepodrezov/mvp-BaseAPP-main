import { Story, Meta } from '@storybook/react'
import { AttentionText, AttentionTextProps } from './attention-text'

export default {
  title: 'Shared/AttentionText',
  component: AttentionText,
  args: {
    text: 'The amount of 30 000 rubles is deducted from the final cost of the car.',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['important', 'attention'],
      defaultValue: 'important',
    },
  },
} as Meta

const Template: Story<AttentionTextProps> = args => <AttentionText {...args} />

export const Default = Template.bind({})
Default.args = {}
