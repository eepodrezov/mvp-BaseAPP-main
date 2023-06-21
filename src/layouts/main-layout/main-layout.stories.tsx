import { Story, Meta } from '@storybook/react'
import { MainLayout } from './main-layout'

export default {
  title: 'Layouts/MainLayout',
  component: MainLayout,
} as Meta

const Template: Story = args => <MainLayout {...args} />

export const Default = Template.bind({})
Default.args = {}
