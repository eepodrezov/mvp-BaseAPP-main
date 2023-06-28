import { FCWithClassName } from '@/shared/@types'
import cn from 'classnames'
import { TabItem } from '@/shared/ui/tabs'
import { Tooltip } from '@/shared/ui'
import { cloneElement } from 'react'
import Link from 'next/link'

interface ProfilePageNavbarProps {
  close?: () => void
  tabs: TabItem[]
}

export const Navbar: FCWithClassName<ProfilePageNavbarProps> = ({ className, close, tabs }) => {

  return (
    <div
      className={cn(
        className,
        'w-full flex justify-around items-center bg-white z-50 pointer-events-none'
      )}
    >
      {tabs.map((tab: TabItem) => (
        <Tooltip key={tab.url} label={tab.name} isActive={false}>
          <Link href={tab.url!}>
            {tab.url != 'recipes' ?
              <div className='flex flex-col items-center gap-extra-small'>
                {tab.icon && cloneElement(tab.icon, {
                  className: 'w-[24px] h-[24px]'
                })}
                <h3>{tab.name}</h3>
              </div>
            :
              <div className='flex flex-col items-center p-[10px] bg-yellow rounded-full mt-[-10px]'>
                {tab.icon && cloneElement(tab.icon, {
                  className: 'w-[30px] h-[30px]'
                })}
                <h3>{tab.name}</h3>
              </div>
              }
          </Link>
        </Tooltip>
      ))}
    </div>
  )
}
