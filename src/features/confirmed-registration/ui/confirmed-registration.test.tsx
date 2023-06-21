import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './confirmed-registration.stories'

const { Default } = composeStories(stories)

describe('ConfirmedRegistration Tests', () => {
  it('ConfirmedRegistration should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
