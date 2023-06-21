import { render, act } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './range-select.stories'
import userEvent from '@testing-library/user-event'

const { Default } = composeStories(stories)

describe('RangeSelectTests', () => {
  it('every type of selects should be render', () => {
    const defaultComponent = render(<Default />)
    expect(defaultComponent.container).toBeInTheDocument()
  })

  it('select should be work', async () => {
    const container = render(<Default />)
    await act(() => userEvent.click(container.getAllByRole('textbox')[0]))
    await act(() => userEvent.click(container.getByRole('option', { name: '1,500,000 ₽' })))
    await act(() => userEvent.click(container.getAllByRole('textbox')[1]))
    await act(() => userEvent.click(container.getByRole('option', { name: '5,000,000 ₽' })))
    expect(container.getAllByRole('textbox')[0]).toHaveValue('1,500,000 ₽')
    expect(container.getAllByRole('textbox')[1]).toHaveValue('5,000,000 ₽')
  })

  it('select options to be work', async () => {
    const container = render(<Default />)
    await act(() => userEvent.click(container.getAllByRole('textbox')[0]))
    expect(container.getByRole('option', { name: '500,000 ₽' })).toBeInTheDocument()
    await act(() => userEvent.click(container.getByRole('option', { name: '1,500,000 ₽' })))

    await act(() => userEvent.click(container.getAllByRole('textbox')[1]))
    expect(container.queryByRole('option', { name: '500,000 ₽' })).not.toBeInTheDocument()
    expect(container.getByRole('option', { name: '6,000,000 ₽' })).toBeInTheDocument()
    await act(() => userEvent.click(container.getByRole('option', { name: '5,000,000 ₽' })))
    expect(container.getAllByRole('textbox')[1]).toHaveValue('5,000,000 ₽')

    await act(() => userEvent.click(container.getAllByRole('textbox')[0]))
    expect(container.queryByRole('option', { name: '6,000,000 ₽' })).not.toBeInTheDocument()
  })
})
