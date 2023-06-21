import { act, fireEvent, render, renderHook, screen, waitFor } from '@/jest/utils'
import { Nullable } from '@/shared/@types'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import * as stories from './select.stories'

const { Default } = composeStories(stories)

describe('SelectTests', () => {
  it('every type of selects should be render', () => {
    const defaultComponent = render(<Default />)
    expect(defaultComponent.container).toBeInTheDocument()
  })

  it('select should open and have all options', () => {
    render(<Default />)
    const select = screen.getByTestId('input')
    act(() => {
      fireEvent.click(select)
    })
    const optionsElements = screen.getAllByTestId('select-option')
    expect(optionsElements.length).toBe(5)
    act(() => {
      fireEvent.blur(select)
    })
  })

  it('clicked option should be selected', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Nullable<number>>(1)
      return { value, setValue }
    })
    render(<Default value={result.current.value} onChange={result.current.setValue} />)
    act(() => {
      fireEvent.click(screen.getByTestId('input'))
    })
    const optionsElements = screen.getAllByTestId('select-option')
    expect(result.current.value).toBe(1)
    act(() => {
      fireEvent.click(screen.getByTestId('input'))
    })
    act(() => {
      fireEvent.click(optionsElements[1])
    })
    waitFor(() => expect(result.current.value).toBe(2))
  })

  it('select with empty value should render plug', () => {
    render(<Default options={undefined} />)
    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })
    expect(screen.getByText(/emptyRequest/)).toBeInTheDocument()
  })

  it('while select is loading options should render spinner', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Nullable<number>>(1)
      return { value, setValue }
    })
    render(<Default value={result.current.value} onChange={result.current.setValue} isLoading />)
    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })
    expect(screen.getByTestId('select-options-wrapper').querySelector('svg')).toBeInTheDocument()
  })
  it('onFunction and onBlur function should be called', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    render(<Default inputProps={{ onFocus, onBlur }} />)
    expect(onFocus).toHaveBeenCalledTimes(0)
    expect(onBlur).toHaveBeenCalledTimes(0)
    const inputWrapper = screen.getByTestId('input-wrapper')
    fireEvent.focus(inputWrapper)
    expect(onFocus).toHaveBeenCalledTimes(1)
    fireEvent.blur(inputWrapper)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })
  it('button close after click clear value', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Nullable<number>>(1)
      return { value, setValue }
    })
    render(<Default value={result.current.value} onChange={result.current.setValue} />)
    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })
    act(() => {
      fireEvent.click(screen.getAllByTestId('select-option')[1])
    })
    act(() => {
      fireEvent.click(screen.getByTestId('select-close-icon'))
    })
    waitFor(() => expect(result.current.value).toBeNull())
  })
})
