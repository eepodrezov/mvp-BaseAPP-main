import { viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { ChangePrivateInfo } from './change-private-info'

export default {
  title: 'Entities/Viewer/ChangePrivateInfo',
  component: ChangePrivateInfo,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: { id: 1, isEmailConfirmed: true, telegram: 'telegram' },
      },
    },
  },
} as Meta

const Template: Story = args => <ChangePrivateInfo {...args} />

export const Default = Template.bind({})
Default.args = {}
