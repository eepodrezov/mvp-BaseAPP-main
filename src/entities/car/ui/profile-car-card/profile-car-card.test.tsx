import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './profile-car-card.stories'

const { Default } = composeStories(stories)

describe('ProfileCarCard Tests', () => {
  it('ProfileCarCard should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
