import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './footer.stories'

const { Default } = composeStories(stories)

describe('Footer Tests', () => {
  it('Footer should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
