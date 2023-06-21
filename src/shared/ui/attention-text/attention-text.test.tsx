import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './attention-text.stories'

const { Default } = composeStories(stories)

describe('AttentionText Tests', () => {
  it('AttentionText type important should be render', () => {
    const component = render(<Default type='important' />)
    expect(component.container).toBeInTheDocument()
  })

  it('AttentionText type attention should be render', () => {
    const component = render(<Default type='attention' />)
    expect(component.container).toBeInTheDocument()
  })
})
