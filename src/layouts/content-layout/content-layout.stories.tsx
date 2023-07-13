import { Story, Meta } from '@storybook/react'
import { ContentLayout, ContentLayoutProps } from './content-layout'

export default {
  title: 'Layouts/ContentLayout',
  component: ContentLayout,
} as Meta

const Template: Story<ContentLayoutProps> = args => <ContentLayout {...args} />

export const Default = Template.bind({})
Default.args = {}
