import { render, screen, act } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'
import * as stories from './share-button.stories'

const { Default } = composeStories(stories)

describe('ShareButtonTests', () => {
  it('share-button should be render', () => {
    const component = render(<Default />)
    expect(component.getByRole('button')).toBeInTheDocument()
  })
  it('click share button , after visible tooltip and after invisible tooltip', async () => {
    render(<Default />)
    jest.spyOn(navigator.clipboard, 'writeText')
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0)
    await act(async () => await userEvent.click(screen.getByRole('button')))
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href)
  })
})
