import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './header-mobile.stories'

const { Default } = composeStories(stories)

describe('HeaderMobileTests', () => {
  it('HeaderMobile should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
