import { viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { FavoritesTab } from './favorites-tab'

export default {
  title: 'Views/Tabs/FavoritesTab',
  component: FavoritesTab,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          id: 1,
        },
      },
    },
  },
} as Meta

const Template: Story = args => <FavoritesTab {...args} />

export const Default = Template.bind({})
Default.args = {}
