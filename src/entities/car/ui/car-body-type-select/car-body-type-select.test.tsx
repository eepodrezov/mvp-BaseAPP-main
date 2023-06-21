import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-body-type-select.stories'

const { Default } = composeStories(stories)

describe('CarBodyTypeSelect Tests', () => {
  it('CarBodyTypeSelect should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
