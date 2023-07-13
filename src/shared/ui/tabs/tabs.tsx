import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'

export type TabItem = {
  name: string
  panel?: JSX.Element
  disabled?: boolean
}

export interface TabsProps {
  name?: string
  tabs: TabItem[]
  defaultIndex?: number
  selectedTab?: number
  tabClassName?: string
  contentWrapperClassName?: string
  onChange?: (value: number) => void
}

export const Tabs: FCWithClassName<TabsProps> = ({
  tabs,
  defaultIndex,
  selectedTab = 0,
  className,
  tabClassName,
  contentWrapperClassName,
  onChange,
}) => {
  return (
    <Tab.Group defaultIndex={defaultIndex} selectedIndex={selectedTab} onChange={(e: number) => onChange?.(e)}>
      <Tab.List className={cn('inline-flex items-center gap-4', className)}>
        {({ selectedIndex }) => (
          <>
            {tabs.map(({ name, disabled }, idx) => (
              <Tab
                data-testid='tab-button'
                key={name}
                disabled={disabled}
                className={cn(
                  `min-h-[50px] px-5 desktop:px-[33px] croogla-mobile desktop:croogla-text rounded-xl border border-transparent
                   desktop:hover:enabled:border-black active:enabled:bg-black active:text-white disabled:text-border
                   disabled:cursor-not-allowed transition-colors whitespace-nowrap`,
                  tabClassName,
                  {
                    'bg-black text-white': selectedIndex === idx,
                    'bg-white text-black ': selectedIndex !== idx,
                  }
                )}
              >
                <span>{name}</span>
              </Tab>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels data-testid='tab-panel' className={cn('will-change-contents', contentWrapperClassName)}>
        {tabs.map(({ panel }, idx) => (
          <Tab.Panel key={idx} as={Fragment}>
            <>{panel}</>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
