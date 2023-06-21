import { Story, Meta } from '@storybook/react'
import { Footer } from './footer'

export default {
  title: 'Widgets/Footer',
  component: Footer,
} as Meta

const Template: Story = args => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}
