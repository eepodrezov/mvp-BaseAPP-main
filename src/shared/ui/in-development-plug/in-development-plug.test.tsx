import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './in-development-plug.stories'

const { Default } = composeStories(stories)

describe('InDevelopmentPlug Tests', () => {
  it('InDevelopmentPlug should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
