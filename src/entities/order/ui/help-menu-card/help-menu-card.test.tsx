import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './help-menu-card.stories'

const { Default } = composeStories(stories)

describe('HelpMenuCard Tests', () => {
  it('HelpMenuCard should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
