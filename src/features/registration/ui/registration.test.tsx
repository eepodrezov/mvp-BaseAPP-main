import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './registration.stories'

const { Default } = composeStories(stories)

describe('Registration Tests', () => {
  it('Registration should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
