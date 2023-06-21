import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-years-range.stories'

const { Default } = composeStories(stories)

describe('CarYearsRange Tests', () => {
  it('CarYearsRange should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
