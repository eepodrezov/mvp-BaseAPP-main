import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './what-is-booking.stories'

const { Default } = composeStories(stories)

describe('WhatIsBooking Tests', () => {
  it('WhatIsBooking should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
