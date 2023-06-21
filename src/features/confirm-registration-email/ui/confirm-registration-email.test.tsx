import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirm-registration-email.stories'

const { Default } = composeStories(stories)

describe('ConfirmRegistrationEmail Tests', () => {
  it('ConfirmRegistrationEmail should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
