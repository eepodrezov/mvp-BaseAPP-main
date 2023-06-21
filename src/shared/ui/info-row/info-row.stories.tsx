import { Story, Meta } from '@storybook/react'
import { InfoRow, InfoRowProps } from './info-row'
import { mock } from 'mockjs'
export default {
  title: 'Shared/InfoRow',
  component: InfoRow,
  args: mock({
    title: '@title(3)',
    text: '@title(4)',
    tooltipText: '@title(2)',
  }),
} as Meta

const Template: Story<InfoRowProps> = args => <InfoRow {...args} />

export const Default = Template.bind({})
Default.args = {}
