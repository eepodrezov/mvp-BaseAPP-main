import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { ProductTypeTabs } from './product-type-tabs'

export default {
  title: 'Entities/Car/ProductTypeTabs',
  component: ProductTypeTabs,
} as Meta

const Template: Story<PropsWithClassName> = args => <ProductTypeTabs {...args} />

export const Default = Template.bind({})
Default.args = {}
