import { ROLE_DEALER, viewerAtom } from '@/entities/viewer'
import { Story, Meta } from '@storybook/react'
import { StockTab } from './stock-tab'

export default {
  title: 'Views/Tabs/StockTab',
  component: StockTab,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          id: 1,
          roles: [ROLE_DEALER],
        },
      },
    },
  },
} as Meta

const Template: Story = args => <StockTab {...args} />

export const Default = Template.bind({})
Default.args = {}
