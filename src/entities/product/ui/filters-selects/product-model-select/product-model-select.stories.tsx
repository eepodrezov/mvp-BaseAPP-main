import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { ProductModelSelect } from './product-model-select'

export default {
  title: 'Entities/Car/ProductModelSelect',
  component: ProductModelSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <ProductModelSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
