import { fireEvent, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './sorting.stories'
import { DEFAULT_ORDER_VALUE } from '@/shared/config'

const { Default } = composeStories(stories)

describe('SortingTests', () => {
  it('sorting should be render', () => {
    render(<Default />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('sorting should be render options twice with different order', () => {
    render(<Default options={[{ id: 'year', label: 'Year' }]} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('option', { name: 'car:Year: lowToHigh' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'car:Year: highToLow' })).toBeInTheDocument()
  })

  it('sorting should be render default label if value dont have label', () => {
    render(<Default value={DEFAULT_ORDER_VALUE} />)
    expect(screen.getByRole('button', { name: 'sortBy car:newlyListed' })).toBeInTheDocument()
  })

  it('sorting should be render reset buttom after select not default option', () => {
    render(<Default />)
    expect(screen.queryByRole('option', { name: 'reset' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('option', { name: 'car:Year: highToLow' }))
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('option', { name: 'reset' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('option', { name: 'newlyListed' }))
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('option', { name: 'reset' })).not.toBeInTheDocument()
  })
})
