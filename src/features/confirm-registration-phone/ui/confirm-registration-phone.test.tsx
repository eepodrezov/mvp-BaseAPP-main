import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirm-registration-phone.stories'

const { Default } = composeStories(stories)

describe('ConfirmRegistrationPhone Tests', () => {
  it('ConfirmRegistrationPhone should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
