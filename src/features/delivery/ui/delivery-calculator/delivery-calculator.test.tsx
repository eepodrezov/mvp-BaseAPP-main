import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './delivery-calculator.stories'

const { Default } = composeStories(stories)

describe('DeliveryCalculator Tests', () => {
  it('DeliveryCalculator should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
