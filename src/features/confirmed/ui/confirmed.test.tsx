import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirmed.stories'

const { Default } = composeStories(stories)

describe('Confirmed Tests', () => {
  it('Confirmed should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
