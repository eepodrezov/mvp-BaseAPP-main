import { Story, Meta } from '@storybook/react'
import { OverviewItem, OverviewItemProps } from './overview-item'
import OverviewIcon from '@/shared/assets/icons/common/overview-icon.svg'

export default {
  title: 'Shared/OverviewItem',
  component: OverviewItem,
} as Meta

const Template: Story<OverviewItemProps> = args => <OverviewItem {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'bodyType',
  text: '2.0 Inline-4 Turbocharged',
  Icon: OverviewIcon,
}
