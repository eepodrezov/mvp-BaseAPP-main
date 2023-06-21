import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-catalog-header.stories'

const { Default } = composeStories(stories)

describe('CarCatalogHeader Tests', () => {
  // TODO: Add tests
  it('CarCatalogHeader should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
