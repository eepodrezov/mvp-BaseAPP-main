import { render, screen, act, fireEvent, renderHook } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './datepicker.stories'
import dayjs from 'dayjs'
import { DEFAULT_DATE_FORMAT } from '@/shared/config'
import { useState } from 'react'
import { Nullable } from '@/shared/@types'

const { Default } = composeStories(stories)

describe('Datepicker Tests', () => {
  let currentDate: string

  beforeAll(() => {
    currentDate = dayjs().utc(true).format(DEFAULT_DATE_FORMAT)
  })

  it('Datepicker should be render', () => {
    expect(render(<Default />).container).toBeInTheDocument()
  })

  it('Datepicker onChange should work ', () => {
    const { result } = renderHook(() => useState<Nullable<string>>(currentDate))
    const { rerender } = render(<Default value={result.current[0]} onChange={result.current[1]} />)
    expect(screen.getByTestId('input')).toHaveDisplayValue(
      dayjs(result.current[0]).utc(true).format(DEFAULT_DATE_FORMAT)
    )
    act(() => {
      fireEvent.click(screen.getByTestId('input'))
    })
    act(() => {
      fireEvent.click(screen.getAllByRole('cell')[0])
    })
    rerender(<Default value={result.current[0]} onChange={result.current[1]} />)
    expect(screen.getByTestId('input')).toHaveDisplayValue(
      dayjs(result.current[0]).utc(true).format(DEFAULT_DATE_FORMAT)
    )
  })

  it('Datepicker should close dropdown on change', () => {
    render(<Default />)
    act(() => {
      fireEvent.click(screen.getByTestId('input'))
    })
    expect(screen.getByRole('table')).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getAllByRole('cell')[0])
    })
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
