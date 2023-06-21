import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './photo-plug.stories'

const { Default } = composeStories(stories)

describe('PhotoPlug Tests', () => {
  it('PhotoPlug should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
