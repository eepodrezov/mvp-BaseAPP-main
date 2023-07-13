import { Story, Meta } from '@storybook/react'
import { ErrorPageView, ErrorPageViewProps } from './error-page-view'

export default {
  title: 'Views/ErrorPage',
  component: ErrorPageView,
  argTypes: {
    errorType: { control: 'select', options: ['server', 'client'], defaultValue: 'server' },
  },
} as Meta

const Template: Story<ErrorPageViewProps> = args => <ErrorPageView {...args} />

export const Default = Template.bind({})
Default.args = {}
