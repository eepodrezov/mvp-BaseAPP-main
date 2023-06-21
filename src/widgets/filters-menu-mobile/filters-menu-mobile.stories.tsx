import { Story, Meta } from '@storybook/react'
import { FiltersMenuMobile } from './filters-menu-mobile'

export default {
  title: 'Widgets/FiltersMenuMobile',
  component: FiltersMenuMobile,
} as Meta

const Template: Story = args => <FiltersMenuMobile {...args} />

export const Default = Template.bind({})
Default.args = {}
