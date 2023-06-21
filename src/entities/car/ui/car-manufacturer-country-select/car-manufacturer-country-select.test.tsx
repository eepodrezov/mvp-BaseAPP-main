import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-manufacturer-country-select.stories'

const { Default } = composeStories(stories)

describe('CarManufacturerCountrySelect Tests', () => {
  it('CarManufacturerCountrySelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
