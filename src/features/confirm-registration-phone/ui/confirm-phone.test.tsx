import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirm-phone.stories'

const { Default } = composeStories(stories)

describe('ConfirmnPhone Tests', () => {
  it('ConfirmPhone should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
