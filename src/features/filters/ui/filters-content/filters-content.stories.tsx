import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { FiltersContent } from './filters-content'

export default {
  title: 'Features/CarCatalogFilters',
  component: FiltersContent,
} as Meta

const Template: Story<PropsWithClassName> = args => <FiltersContent {...args} />

export const Default = Template.bind({})
Default.args = {}
