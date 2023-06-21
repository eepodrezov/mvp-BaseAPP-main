import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './filters-fast-hand.stories'

const { Default } = composeStories(stories)

describe('FiltersFastHandTests', () => {
  it('FiltersFastHand should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
