import { Story, Meta } from '@storybook/react'
import { InDevelopmentPlugProps, InDevelopmentPlug } from './in-development-plug'

export default {
  title: 'Shared/InDevelopmentPlug',
  component: InDevelopmentPlug,
} as Meta

const Template: Story<InDevelopmentPlugProps> = args => <InDevelopmentPlug {...args} />

export const Default = Template.bind({})
Default.args = {}
