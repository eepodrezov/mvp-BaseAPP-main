import withReactQuery from '@/app/providers/with-react-query'
import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './content-layout.stories'

const { Default } = composeStories(stories)

describe('ContentLayout Tests', () => {
  it('ContentLayout should be render', () => {
    const WithProviders = withReactQuery(Default)
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
})
