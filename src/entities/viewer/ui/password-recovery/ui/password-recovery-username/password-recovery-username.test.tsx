import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './password-recovery-username.stories'

const { Default } = composeStories(stories)

describe('PasswordRecoveryUsername Tests', () => {
  it('PasswordRecoveryUsername should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
