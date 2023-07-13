import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './password-recovery-passwords.stories'

const { Default } = composeStories(stories)

describe('PasswordRecoveryPasswords Tests', () => {
  it('PasswordRecoveryPasswords should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
