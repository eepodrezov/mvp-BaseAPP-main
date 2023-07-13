import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './product-type-tabs.stories'

const { Default } = composeStories(stories)

describe('CarTypeTabs Tests', () => {
  it('CarTypeTabs should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
