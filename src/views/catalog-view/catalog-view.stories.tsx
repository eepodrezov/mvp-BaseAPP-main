import { Story, Meta } from '@storybook/react'
import { CatalogView } from './catalog-view'

export default {
  title: 'Views/CatalogView',
  component: CatalogView,
} as Meta

const Template: Story = args => {
  return <CatalogView {...args} />
}

export const Default = Template.bind({})
Default.args = {}
