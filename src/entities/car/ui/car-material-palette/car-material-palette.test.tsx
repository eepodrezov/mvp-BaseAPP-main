import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-material-palette.stories'

const { Default } = composeStories(stories)

describe('CarMaterialPalette Tests', () => {
  it('CarMaterialPalette should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
