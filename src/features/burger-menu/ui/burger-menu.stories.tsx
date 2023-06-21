import { Story, Meta } from '@storybook/react'
import { BurgerMenu } from './burger-menu'
import { BurgerCallbackContent } from '@/features/burger-callback-content'

export default {
  title: 'Features/BurgerMenu',
  component: BurgerMenu,
} as Meta

const Template: Story = args => (
  <BurgerMenu {...args}>
    <BurgerCallbackContent />
  </BurgerMenu>
)

export const Default = Template.bind({})
Default.args = {}
