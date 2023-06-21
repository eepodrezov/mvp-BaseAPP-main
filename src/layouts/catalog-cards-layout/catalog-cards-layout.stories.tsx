import { Story, Meta } from '@storybook/react'
import { CatalogCardsLayout } from './catalog-cards-layout'

export default {
  title: 'Layouts/CatalogCardsLayout',
  component: CatalogCardsLayout,
} as Meta

const Template: Story = args => <CatalogCardsLayout {...args} />

export const Default = Template.bind({})
Default.args = {}
