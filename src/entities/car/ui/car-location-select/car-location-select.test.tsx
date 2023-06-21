import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-location-select.stories'

const { Default } = composeStories(stories)

describe('CarLocationSelect Tests', () => {
  it('CarLocationSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
