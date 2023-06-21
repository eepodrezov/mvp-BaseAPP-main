import { fireEvent, render, renderHook, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import * as stories from './sidebar-tabs.stories'
import { Orders, PrivateInfo } from '@/shared/assets/icons/sidebar-icons'

const { Default } = composeStories(stories)

//чтобы изменение сториз не сломало тесты
const tabs = [
  { name: 'Private info', icon: <PrivateInfo /> },
  { name: 'My orders', icon: <Orders /> },
]

describe('TabsTests', () => {
  it('sidebar tabs should be render', () => {
    render(<Default tabs={tabs} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('sidebar tabs should be change selected index by tab click', () => {
    const { result } = renderHook(() => useState(0))
    render(<Default tabs={tabs} selectedTab={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(screen.getByRole('tab', { name: 'My orders' }))
    })
    expect(result.current[0]).toBe(1)
  })

  it('sidebar tabs should not be change selected index by disabled tab click', () => {
    const { result } = renderHook(() => useState(0))
    render(<Default tabs={tabs} selectedTab={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(screen.getByRole('tab', { name: 'Private info' }))
    })
    expect(result.current[0]).toBe(0)
  })

  it('sidebar tabs list should be render with custom style', () => {
    render(<Default className='bg-red' />)
    expect(screen.getByRole('tablist')).toHaveClass('bg-red')
  })
})
