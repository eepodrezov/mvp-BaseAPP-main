import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './booking-payment.stories'

const { Default } = composeStories(stories)

describe('BookingPayment Tests', () => {
  it('BookingPayment should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
