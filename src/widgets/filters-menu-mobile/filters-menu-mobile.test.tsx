import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './filters-menu-mobile.stories'

const { Default } = composeStories(stories)

describe('FiltersMenuMobile Tests', () => {
  it('FiltersMenuMobile should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
