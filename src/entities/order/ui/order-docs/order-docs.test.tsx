import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './order-docs.stories'

const { Default } = composeStories(stories)

describe('OrderDocs Tests', () => {
  it('OrderDocs should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
