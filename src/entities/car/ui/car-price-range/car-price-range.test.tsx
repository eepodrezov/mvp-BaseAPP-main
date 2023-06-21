import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-price-range.stories'

const { Default } = composeStories(stories)

describe('CarPriceRange Tests', () => {
  it('CarPriceRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
