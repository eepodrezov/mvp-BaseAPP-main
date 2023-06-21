import { useState } from 'react'
import { render, renderHook, act, screen, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './pagination.stories'

const { Default } = composeStories(stories)

describe('PaginationTests', () => {
  it('component should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })

  it('left arrows should work', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(6)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(6)
    const arrowButtons = screen.getAllByTestId('pagination-arrow-button')
    const leftSingleArrow = arrowButtons[1]
    await act(() => {
      fireEvent.click(leftSingleArrow)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(5)
    const leftDoubleArrow = arrowButtons[0]
    await act(() => {
      fireEvent.click(leftDoubleArrow)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(1)
  })

  it('left arrows should be disabled on first page', () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(1)
      return { page, setPage }
    })
    render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const arrowButtons = screen.getAllByTestId('pagination-arrow-button')
    const leftSingleArrow = arrowButtons[0]
    expect(leftSingleArrow).toBeDisabled()
    const leftDoubleArrow = arrowButtons[1]
    expect(leftDoubleArrow).toBeDisabled()
  })

  it('right arrows should work', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(6)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(6)
    const arrowButtons = screen.getAllByTestId('pagination-arrow-button')
    const rightSingleArrow = arrowButtons[2]
    await act(() => {
      fireEvent.click(rightSingleArrow)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(7)
    const rightDoubleArrow = arrowButtons[3]
    await act(() => {
      fireEvent.click(rightDoubleArrow)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(30)
  })

  it('right arrows should be disabled on last page', () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(30)
      return { page, setPage }
    })
    render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const arrowButtons = screen.getAllByTestId('pagination-arrow-button')
    const rightSingleArrow = arrowButtons[2]
    expect(rightSingleArrow).toBeDisabled()
    const rightDoubleArrow = arrowButtons[3]
    expect(rightDoubleArrow).toBeDisabled()
  })

  it('page button should work', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(2)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(2)
    const pagesButtons = screen.getAllByTestId('pagination-page-button')
    const firstPageButton = pagesButtons[0]
    await act(() => {
      fireEvent.click(firstPageButton)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(1)
    expect(firstPageButton.childNodes[0]).toHaveClass('!text-black')
  })

  it('right dots button should work', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(1)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const rightDots = screen.getByTestId('pagination-right-dots')
    await act(() => {
      fireEvent.click(rightDots)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(6)
  })

  it('right dots button should work on last part', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(25)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const rightDots = screen.getByTestId('pagination-right-dots')
    await act(() => {
      fireEvent.click(rightDots)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(30)
    expect(rightDots).not.toBeInTheDocument()
  })

  it('left dots button should work', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(6)
      return { page, setPage }
    })
    const { rerender } = render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const leftDots = screen.getByTestId('pagination-left-dots')
    await act(() => {
      fireEvent.click(leftDots)
    })
    rerender(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(1)
    expect(leftDots).not.toBeInTheDocument()
  })

  it('left dots button should work on first part', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number>(5)
      return { page, setPage }
    })
    render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    const leftDots = screen.getByTestId('pagination-left-dots')
    await act(() => {
      fireEvent.click(leftDots)
    })
    render(<Default currentPage={result.current.page} onChange={result.current.setPage} />)
    expect(result.current.page).toBe(1)
  })
})
