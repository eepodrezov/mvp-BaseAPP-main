import { Story, Meta } from '@storybook/react'
import { ReturnAndExchangeInfoView } from './return-and-exchange-info-view'

export default {
  title: 'Views/ReturnAndExchangeInfoView',
  component: ReturnAndExchangeInfoView,
} as Meta

const Template: Story = args => <ReturnAndExchangeInfoView {...args} />

export const Default = Template.bind({})
Default.args = {}
