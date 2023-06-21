import { viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { ChangeSettings } from './change-settings'

export default {
  title: 'Entities/Viewer/ChangeSettings',
  component: ChangeSettings,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: { id: 1, email: 'test@mail.ru' },
      },
    },
  },
} as Meta

const Template: Story = args => <ChangeSettings {...args} />

export const Default = Template.bind({})
Default.args = {}
