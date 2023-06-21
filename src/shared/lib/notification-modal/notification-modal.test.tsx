import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './notification-modal.stories'

const { Default } = composeStories(stories)

describe('NotificationModal Tests', () => {
  it('NotificationModal should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
