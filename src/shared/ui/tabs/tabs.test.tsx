import { fireEvent, render, renderHook, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import * as stories from './tabs.stories'

const { Default } = composeStories(stories)

describe('TabsTests', () => {
  it('tabs should be render', () => {
    render(<Default />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('tabs should be render all tab', () => {
    render(<Default />)
    expect(screen.getByRole('tab', { name: 'New cars' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Best cars' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Used cars' })).toBeInTheDocument()
  })

  it('tabs should be change selected index by tab click', () => {
    const { result } = renderHook(() => useState(0))
    render(<Default selectedTab={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(screen.getByRole('tab', { name: 'Best cars' }))
    })
    expect(result.current[0]).toBe(1)
  })

  it('tabs should not be change selected index by disabled tab click', () => {
    const { result } = renderHook(() => useState(0))
    render(<Default selectedTab={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(screen.getByRole('tab', { name: 'Used cars' }))
    })
    expect(result.current[0]).toBe(0)
  })

  it('tabs list should be render with custom style', () => {
    render(<Default className='bg-red' />)
    expect(screen.getByRole('tablist')).toHaveClass('bg-red')
  })

  it('tabs panels should be render with custom style', () => {
    render(<Default contentWrapperClassName='bg-red' />)
    expect(screen.getByTestId('tab-panel')).toHaveClass('bg-red')
  })
})
