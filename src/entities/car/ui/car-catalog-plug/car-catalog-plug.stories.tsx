import { Story, Meta } from '@storybook/react'
import { CarCatalogPlug } from './car-catalog-plug'

export default {
  title: 'Entities/Car/CarCatalogPlug',
  component: CarCatalogPlug,
} as Meta

const Template: Story = args => <CarCatalogPlug {...args} />

export const Default = Template.bind({})
Default.args = {}
