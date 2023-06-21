import { act, fireEvent, renderWithProviders as render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './favorite-button.stories'

const { Default, WithText } = composeStories(stories)

describe('FavoriteButtonTests', () => {
  it('favorite button should be render', () => {
    render(<Default />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('favorite button should be change styles when isFavorite state changed', () => {
    render(<Default />)
    expect(screen.getByTestId('favorite-icon')).toHaveClass('transition-[fill] stroke-currentColor')
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByTestId('favorite-icon')).not.toHaveClass('fill-transparent')
    expect(screen.getByTestId('favorite-icon')).toHaveClass('fill-red')
  })

  it('favorite button with text should be render with text', () => {
    render(<WithText />)
    expect(screen.getByText('addToFavorite')).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByText('inFavorite')).toBeInTheDocument()
  })

  it('favorite button is disabled and no change state isFavorite', () => {
    const onClick = jest.fn()
    render(<Default disabled onClick={onClick} />)
    expect(screen.getByRole('button')).toBeDisabled()
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(onClick).toBeCalledTimes(0)
  })
})
