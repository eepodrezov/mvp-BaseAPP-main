import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-exterior-color-palette.stories'

const { Default } = composeStories(stories)

describe('CarExteriorColorPalette Tests', () => {
  it('CarExteriorColorPalette should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
