import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './profile-page-navbar.stories'

const { Default } = composeStories(stories)

describe('HeaderTests', () => {
  it('Header should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
