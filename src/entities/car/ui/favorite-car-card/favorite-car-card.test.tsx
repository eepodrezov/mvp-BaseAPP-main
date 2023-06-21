import withNotification from '@/app/providers/with-notification'
import withReactQuery from '@/app/providers/with-react-query'
import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './favorite-car-card.stories'

const { Default } = composeStories(stories)

describe('FavoriteCarCard Tests', () => {
  it('FavoritesCarCard should be render', () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
})
