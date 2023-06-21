import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-interior-color-palette.stories'

const { Default } = composeStories(stories)

describe('CarInteriorColorPalette Tests', () => {
  it('CarInteriorColorPalette should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
