import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-dealer-select.stories'

const { Default } = composeStories(stories)

describe('CarDealerSelect Tests', () => {
  it('CarDealerSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
