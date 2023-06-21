import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { SidebarTabs, SidebarTabsProps } from './sidebar-tabs'
import { Favorites, Info, Orders, Payments, PrivateInfo, Settings } from '@/shared/assets/icons/sidebar-icons'
import { PropsWithClassName } from '@/shared/@types'

export default {
  title: 'Shared/SidebarTabs',
  component: SidebarTabs,
  args: {
    tabs: [
      { name: 'Private info', icon: <PrivateInfo /> },
      { name: 'My orders', icon: <Orders /> },
      { name: 'Favorites', icon: <Favorites /> },
      { name: 'Settings', icon: <Settings /> },
      { name: 'Payment history', icon: <Payments /> },
      { name: 'Help', icon: <Info /> },
    ],
  },
} as Meta

const Template: Story<PropsWithClassName<SidebarTabsProps>> = args => {
  const [currentTab, setCurrentTab] = useState(0)

  return <SidebarTabs selectedTab={currentTab} onChange={setCurrentTab} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
