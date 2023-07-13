import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirm-email.stories'

const { Default } = composeStories(stories)

describe('ConfirmEmail Tests', () => {
  it('ConfirmEmail should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
