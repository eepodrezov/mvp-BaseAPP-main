import { fireEvent, render, renderHook, screen, waitFor } from '@/jest/utils'
import { Nullable } from '@/shared/@types'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import * as stories from './select-search.stories'

const { Default } = composeStories(stories)

describe('SelectSearchTests', () => {
  it('select search component should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
  it('close button in select search should be work', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Nullable<number>>(1)
      return { value, setValue }
    })
    render(<Default onChange={result.current.setValue} value={result.current.value} />)
    act(() => {
      fireEvent.click(screen.getByTestId('input-wrapper'))
    })
    waitFor(() => fireEvent.click(screen.getAllByTestId('rc-select-item-option')[0]))
    waitFor(() => expect(screen.getByTestId('close-button-select-search')).toBeInTheDocument())
    waitFor(() => fireEvent.click(screen.getByTestId('close-button-select-search')))
    waitFor(() => expect(screen.getByTestId('input')).toHaveDisplayValue(''))
    waitFor(() => expect(result.current.value).toBeNull())
  })
  it('open-close button in select search should be work', () => {
    render(<Default />)
    act(() => {
      fireEvent.click(screen.getByTestId('input-wrapper'))
    })
    waitFor(() => expect(screen.getByTestId('suffix-icon-select-search')).toBeInTheDocument())
    waitFor(() => fireEvent.mouseDown(screen.getByTestId('suffix-icon-select-search')))
    waitFor(() => expect(screen.getAllByTestId('rc-select-item-option')[0]).toBeInTheDocument())
    waitFor(() => fireEvent.mouseDown(screen.getByTestId('suffix-icon-select-search')))
    waitFor(() => expect(screen.getAllByTestId('rc-select-item-option')[0]).not.toBeInTheDocument())
  })
  it('select search searched value should be work', async () => {
    const component = render(<Default />)
    act(() => {
      fireEvent.click(screen.getByTestId('input-wrapper'))
    })
    fireEvent.change(component.getByTestId('input'), {
      target: { value: 'test' },
    })
    waitFor(() => expect(screen.getByTestId('input')).toHaveDisplayValue('test'))
  })
})
