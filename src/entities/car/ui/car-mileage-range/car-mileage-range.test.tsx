import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-mileage-range.stories'

const { Default } = composeStories(stories)

describe('CarMileageRange Tests', () => {
  it('CarMileageRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
