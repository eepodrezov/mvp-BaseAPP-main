import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'
import { useRouter } from 'next/router'

export type SidebarTabItem = {
  name: string
  disabled?: boolean
  icon?: JSX.Element
  url?: string
  tabClassName?: string
  childrenPage?: boolean
}

export interface SidebarTabsProps {
  tabs: SidebarTabItem[]
  defaultIndex?: number
  selectedTab?: number
  onChange?: (value: number) => void
}

export const SidebarTabs: FCWithClassName<SidebarTabsProps> = ({
  tabs,
  defaultIndex,
  selectedTab,
  className,
  onChange,
}) => {
  const router = useRouter()

  function handleChange(e: number) {
    if (tabs[e].url) router.push(tabs[e].url!)
    if (onChange) onChange(e)
  }

  const selectedTabFromUrlOrProps = tabs.findIndex(el => el.url && router.pathname.includes(el.url)) || selectedTab || 0

  return (
    <Tab.Group defaultIndex={defaultIndex} selectedIndex={selectedTabFromUrlOrProps} onChange={handleChange}>
      <Tab.List className={cn('inline-flex flex-col items-center bg-black gap-px', className)}>
        {({ selectedIndex }) => (
          <>
            {tabs.map(({ name, tabClassName, icon, childrenPage, url, disabled }, idx) => (
              <Tab
                data-testid='tab-button'
                key={name}
                disabled={disabled}
                className={cn(
                  `w-full p-4 desktop:px-5 source-text active:enabled:rounded-xl border-transparent hover:enabled:text-red
                   active:enabled:bg-disabled active:enabled:text-red text-white disabled:text-border
                   disabled:cursor-not-allowed flex justify-start gap-3 outline-none`,
                  tabClassName,
                  {
                    'bg-disabled rounded-xl text-white': selectedIndex === idx,
                    'bg-black': selectedIndex !== idx,
                  }
                )}
                onClick={() => childrenPage && url && router.push(url)}
              >
                <>
                  {icon}
                  <span className='whitespace-nowrap'>{name}</span>
                </>
              </Tab>
            ))}
          </>
        )}
      </Tab.List>
    </Tab.Group>
  )
}
