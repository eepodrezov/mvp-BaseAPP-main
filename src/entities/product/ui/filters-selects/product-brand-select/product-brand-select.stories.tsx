import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { ProductBrandSelect } from './product-brand-select'

export default {
  title: 'Entities/Car/ProductBrandSelect',
  component: ProductBrandSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <ProductBrandSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
