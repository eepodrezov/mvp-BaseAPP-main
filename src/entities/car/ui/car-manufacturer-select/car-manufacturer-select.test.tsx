import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-manufacturer-select.stories'

const { Default } = composeStories(stories)

describe('CarManufacturerSelect Tests', () => {
  it('CarManufacturerSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
