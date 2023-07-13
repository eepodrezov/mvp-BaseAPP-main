import { fireEvent, render, renderHook, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import * as stories from './color-palette.stories'

const { Default } = composeStories(stories)

describe('ColorPaletteTests', () => {
  it('color palette should be render', () => {
    render(<Default />)
    expect(screen.queryByTestId('color-palette')).toBeInTheDocument()
  })

  it('color palette should be change selectedIds on click', () => {
    const { result } = renderHook(() => useState<number[]>([]))
    const { rerender } = render(<Default selectedIds={result.current[0]} onChange={result.current[1]} />)
    const options = screen.getAllByTestId('color-option')
    act(() => {
      fireEvent.click(options[0])
    })
    expect(result.current[0]).toStrictEqual([1])
    rerender(<Default selectedIds={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(options[1])
    })
    expect(result.current[0]).toStrictEqual([1, 2])
    rerender(<Default selectedIds={result.current[0]} onChange={result.current[1]} />)
    act(() => {
      fireEvent.click(options[1])
    })
    expect(result.current[0]).toStrictEqual([1])
  })

  it('color palette should be render select all switch with withSelectAll props', () => {
    render(<Default withSelectAll />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('color palette should be render label for select all switch with selectAllLabel props', () => {
    render(<Default withSelectAll selectAllLabel='Select all switch' />)
    expect(screen.getByRole('switch', { name: 'Select all switch' })).toBeInTheDocument()
  })

  it('color palette select all switch should be change selectedIds on click', () => {
    const { result } = renderHook(() => useState<number[]>([]))
    const { rerender } = render(<Default selectedIds={result.current[0]} onChange={result.current[1]} withSelectAll />)
    expect(result.current[0]).toStrictEqual([])
    act(() => {
      fireEvent.click(screen.getByRole('switch'))
    })
    expect(result.current[0]).toStrictEqual([1, 2, 3, 4, 5, 6])
    rerender(<Default selectedIds={result.current[0]} onChange={result.current[1]} withSelectAll />)
    act(() => {
      fireEvent.click(screen.getByRole('switch'))
    })
    expect(result.current[0]).toStrictEqual([])
  })

  it('color palette reset colors options should be reset selectedIds on click', () => {
    const { result } = renderHook(() => useState<number[]>([1, 2, 3]))
    render(<Default selectedIds={result.current[0]} onChange={result.current[1]} />)
    expect(result.current[0]).toStrictEqual([1, 2, 3])
    act(() => {
      fireEvent.click(screen.getByTestId('reset-colors-option'))
    })
    expect(result.current[0]).toStrictEqual([])
  })
})
