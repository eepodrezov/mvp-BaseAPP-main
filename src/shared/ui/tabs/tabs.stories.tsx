import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Tabs, TabsProps } from './tabs'

export default {
  title: 'Shared/Tabs',
  component: Tabs,
  args: {
    tabs: [{ name: 'New cars' }, { name: 'Best cars' }, { name: 'Used cars', disabled: true }],
  },
} as Meta

const Template: Story<TabsProps> = args => {
  const [currentTab, setCurrentTab] = useState(0)

  return <Tabs selectedTab={currentTab} onChange={setCurrentTab} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
