import { fireEvent, render, renderHook, screen, waitFor } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useState } from 'react'
import * as stories from './range-input.stories'

const { Default } = composeStories(stories)

describe('RangeInputTests', () => {
  it('range input should be render', () => {
    render(<Default />)
    const spinButtons = screen.getAllByRole('spinbutton')
    expect(spinButtons[0]).toBeInTheDocument()
    expect(spinButtons[1]).toBeInTheDocument()
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  it('range inputs should be change value and range aria-labels correct', async () => {
    const { result } = renderHook(() => useState<number[]>())
    render(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    const sliderHandlers = screen.getAllByRole('slider')
    const spinButtons = screen.getAllByRole('spinbutton')
    const inputFrom = spinButtons[0]
    const inputTo = spinButtons[1]
    expect(inputFrom).toHaveDisplayValue('0')
    expect(inputTo).toHaveDisplayValue('1000')
    expect(sliderHandlers[0]).toHaveAttribute('aria-valuenow', '0')
    expect(sliderHandlers[1]).toHaveAttribute('aria-valuenow', '1000')
    expect(result.current[0]).toStrictEqual(undefined)
    fireEvent.input(inputFrom, { target: { value: 500 } })
    fireEvent.change(inputFrom, { target: { value: 500 } })
    expect(inputFrom).toHaveDisplayValue('500')
    expect(inputTo).toHaveDisplayValue('1000')
    expect(sliderHandlers[0]).toHaveAttribute('aria-valuenow', '500')
    expect(sliderHandlers[1]).toHaveAttribute('aria-valuenow', '1000')
    await waitFor(() => expect(result.current[0]).toStrictEqual([500, 1000]))
    fireEvent.input(inputTo, { target: { value: 700 } })
    fireEvent.change(inputTo, { target: { value: 700 } })
    expect(inputFrom).toHaveDisplayValue('500')
    expect(inputTo).toHaveDisplayValue('700')
    expect(sliderHandlers[0]).toHaveAttribute('aria-valuenow', '500')
    expect(sliderHandlers[1]).toHaveAttribute('aria-valuenow', '700')
    await waitFor(() => expect(result.current[0]).toStrictEqual([500, 700]))
  })

  it('range inputs should be set value max or min if user out of range', async () => {
    const { result } = renderHook(() => useState<number[]>())
    render(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    const spinButtons = screen.getAllByRole('spinbutton')
    const inputFrom = spinButtons[0]
    const inputTo = spinButtons[1]
    fireEvent.change(inputFrom, { target: { value: -100 } })
    await waitFor(() => expect(result.current[0]).toStrictEqual([0, 1000]))
    fireEvent.change(inputTo, { target: { value: 7777 } })
    await waitFor(() => expect(result.current[0]).toStrictEqual([0, 1000]))
  })

  it('range inputs should be reverse value array if to lesser then fron and vice versa', async () => {
    const { result } = renderHook(() => useState<number[]>([0, 1000]))
    const { rerender } = render(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    const spinButtons = screen.getAllByRole('spinbutton')
    const inputFrom = spinButtons[0]
    const inputTo = spinButtons[1]
    fireEvent.change(inputFrom, { target: { value: 500 } })
    rerender(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    await waitFor(() => expect(result.current[0]).toStrictEqual([500, 1000]))
    fireEvent.change(inputTo, { target: { value: 400 } })
    rerender(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    await waitFor(() => expect(result.current[0]).toStrictEqual([400, 500]))
    fireEvent.change(inputFrom, { target: { value: 600 } })
    rerender(<Default value={result.current[0]} onChange={result.current[1]} min={0} max={1000} />)
    await waitFor(() => expect(result.current[0]).toStrictEqual([500, 600]))
  })
})
