import { Story, Meta } from '@storybook/react'
import { FilterDisclosure, FilterDisclosureProps } from './filter-disclosure'
import { composeStories } from '@storybook/testing-react'
import * as stories from '../range-input/range-input.stories'

const { Default: RangeInput } = composeStories(stories)

export default {
  title: 'Shared/FilterDisclosure',
  component: FilterDisclosure,
  args: {
    label: 'Price',
  },
} as Meta

const Template: Story<FilterDisclosureProps> = args => (
  <FilterDisclosure {...args}>
    <RangeInput name='Storybook range-input' />
  </FilterDisclosure>
)

export const Default = Template.bind({})
Default.args = {}
