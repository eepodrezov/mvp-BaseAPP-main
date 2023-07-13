import { Story, Meta } from '@storybook/react'
import { InfoPageContentLayout, InfoPageContentLayoutProps } from './info-page-content-layout'

export default {
  title: 'Layouts/InfoPageContentLayout',
  component: InfoPageContentLayout,
  args: {
    title: 'InfoPageContentLayoutTest',
  },
} as Meta

const Template: Story<InfoPageContentLayoutProps> = args => (
  <InfoPageContentLayout {...args}>
    <h4>testTest</h4>
  </InfoPageContentLayout>
)

export const Default = Template.bind({})
Default.args = {}
