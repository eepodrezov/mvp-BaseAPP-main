import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './car-catalog-plug.stories'

const { Default } = composeStories(stories)

describe('CarCatalogPlug Tests', () => {
  it('CarCatalogPlug should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
