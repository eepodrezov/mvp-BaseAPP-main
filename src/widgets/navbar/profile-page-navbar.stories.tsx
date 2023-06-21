import { Story, Meta } from '@storybook/react'
import { Navbar } from './navbar'
import { TabItem } from '@/shared/ui/tabs'

export default {
  title: 'Widgets/Navbar',
  component: Navbar,
} as Meta

const tabs: TabItem[] = [
  { name: 'Catalog', url:'catalog'},
  { name: 'Basket',url:'basket'},
  { name: 'Recipes', url:'recipes'},
  { name: 'Product List', url:'list'},
  { name: 'Profile', url:'profile'}
]

const Template: Story = args => {
  return <Navbar {...args} tabs={tabs}/>
}

export const Default = Template.bind({})
Default.args = {}
