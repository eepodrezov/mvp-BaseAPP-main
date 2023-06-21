import { Story, Meta } from '@storybook/react'
import { HelpMenuCard, HelpMenuCardProps } from './help-menu-card'

export default {
  title: 'Entities/Order/HelpMenuCard',
  component: HelpMenuCard,
} as Meta

const Template: Story<HelpMenuCardProps> = args => <HelpMenuCard {...args} />

export const Default = Template.bind({})
Default.args = {}
