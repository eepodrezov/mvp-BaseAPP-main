import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './order-page-file-info.stories'

const { Default } = composeStories(stories)

describe('OrderPageFileInfo Tests', () => {
  it('OrderPageFileInfo should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
