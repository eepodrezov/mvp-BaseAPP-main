import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-engine-volume-range.stories'

const { Default } = composeStories(stories)

describe('CarEngineVolumeRange Tests', () => {
  it('CarEngineVolumeRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
