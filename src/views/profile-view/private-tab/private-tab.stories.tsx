import { viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { PrivateTab } from './private-tab'

export default {
  title: 'Views/Tabs/PrivateTab',
  component: PrivateTab,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: { id: 1 },
      },
    },
  },
} as Meta

const Template: Story = args => <PrivateTab {...args} />

export const Default = Template.bind({})
Default.args = {}
