import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './profile-car-header.stories'

const { Default } = composeStories(stories)

describe('ProfileCarHeader Tests', () => {
  it('ProfileCarHeader should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
