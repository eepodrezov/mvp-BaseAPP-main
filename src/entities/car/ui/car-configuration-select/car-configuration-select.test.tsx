import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-configuration-select.stories'

const { Default } = composeStories(stories)

describe('CarConfigurationSelect Tests', () => {
  it('CarConfigurationSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
