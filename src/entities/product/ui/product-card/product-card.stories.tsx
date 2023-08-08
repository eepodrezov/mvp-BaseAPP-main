import { PRODUCT_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { ProductCard, ProductCardProps } from './product-card'

export default {
  title: 'Entities/Product/ProductCard',
  component: ProductCard,
  argTypes: {
    type: { control: 'select', options: ['catalog', 'page'], defaultValue: 'catalog' },
  },
  args: {
    car: mock(PRODUCT_ENTITY_MOCK),
  },
} as Meta

const Template: Story<ProductCardProps> = args => <ProductCard {...args} />

export const Default = Template.bind({})
Default.args = {}
