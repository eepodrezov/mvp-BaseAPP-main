import { Story, Meta } from '@storybook/react'
import { FiltersMobileModal } from './filters-mobile-modal'

export default {
  title: 'Features/FiltersMobileModal',
  component: FiltersMobileModal,
} as Meta

const Template: Story = args => <FiltersMobileModal {...args} />

export const Default = Template.bind({})
Default.args = {}
