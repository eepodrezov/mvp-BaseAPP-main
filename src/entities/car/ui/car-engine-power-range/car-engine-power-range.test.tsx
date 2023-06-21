import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-engine-power-range.stories'

const { Default } = composeStories(stories)

describe('CarEnginePowerRange Tests', () => {
  it('CarEnginePowerRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
