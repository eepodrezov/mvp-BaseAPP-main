import { Story, Meta } from '@storybook/react'
import { CompanyInfoView } from './company-info-view'

export default {
  title: 'Views/CompanyInfoView',
  component: CompanyInfoView,
} as Meta

const Template: Story = args => <CompanyInfoView {...args} />

export const Default = Template.bind({})
Default.args = {}
