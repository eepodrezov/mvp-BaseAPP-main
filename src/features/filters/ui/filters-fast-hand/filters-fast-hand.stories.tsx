import { carCollectionPrice, CarPriceRange } from '@/entities/car'
import { Story, Meta } from '@storybook/react'
import { FiltersFastHand, FiltersFastHandProps } from './filters-fast-hand'

export default {
  title: 'Features/FiltersFastHand',
  component: FiltersFastHand,
  args: {
    label: 'Storybook Fast-hand Filter',
    atom: carCollectionPrice,
  },
} as Meta

const Template: Story<FiltersFastHandProps<number[]>> = args => {
  return (
    <FiltersFastHand {...args}>
      <CarPriceRange />
    </FiltersFastHand>
  )
}

export const Default = Template.bind({})
Default.args = {}
