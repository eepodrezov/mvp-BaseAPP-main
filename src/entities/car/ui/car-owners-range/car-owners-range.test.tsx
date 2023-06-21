import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-owners-range.stories'

const { Default } = composeStories(stories)

describe('CarOwnersRange Tests', () => {
  it('CarOwnersRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
