import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './informer.stories'

const { Default } = composeStories(stories)

describe('Informers Tests', () => {
  it('Informer should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
