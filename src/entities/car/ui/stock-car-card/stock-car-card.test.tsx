import withNotification from '@/app/providers/with-notification'
import withReactQuery from '@/app/providers/with-react-query'
import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './stock-car-card.stories'

const { Default } = composeStories(stories)

describe('StockCarCard Tests', () => {
  it('StockCarCard should be render', () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
})
