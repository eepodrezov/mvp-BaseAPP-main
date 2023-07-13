import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-age-range.stories'

const { Default } = composeStories(stories)

describe('CarAgeRange Tests', () => {
  it('CarAgeRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
