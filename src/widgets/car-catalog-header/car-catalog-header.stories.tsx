import { Story, Meta } from '@storybook/react'
import { CarCatalogHeader } from './car-catalog-header'

export default {
  title: 'Widgets/CarCatalogHeader',
  component: CarCatalogHeader,
} as Meta

const Template: Story = args => <CarCatalogHeader {...args} />

export const Default = Template.bind({})
Default.args = {}
