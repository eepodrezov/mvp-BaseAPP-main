import { Story, Meta } from '@storybook/react'
import { FiltersResetButton } from './filters-reset-button'

export default {
  title: 'Features/FiltersResetButton',
  component: FiltersResetButton,
} as Meta

const Template: Story = args => <FiltersResetButton {...args} />

export const Default = Template.bind({})
Default.args = {}
