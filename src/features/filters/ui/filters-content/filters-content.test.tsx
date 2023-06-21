import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './filters-content.stories'

const { Default } = composeStories(stories)

describe('FiltersContent Tests', () => {
  it('FiltersContent should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
