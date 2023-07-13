import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './social-buttons.strories'

const { Default } = composeStories(stories)

describe('SocialButtonsTests', () => {
  it('SocialButtons should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
