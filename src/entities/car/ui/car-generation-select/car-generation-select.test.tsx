import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-generation-select.stories'

const { Default } = composeStories(stories)

describe('CarGenerationSelect Tests', () => {
  it('CarGenerationSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
