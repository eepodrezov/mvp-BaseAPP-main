import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './button-mobile-fixed-wrapper.stories'

const { Default } = composeStories(stories)

describe('ButtonFixedWrapper Tests', () => {
  it('ButtonFixedWrapper should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
