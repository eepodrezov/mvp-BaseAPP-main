import { render, RenderResult } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './are-you-sure.stories'

const { Default } = composeStories(stories)

describe('UserDocumentDataShow', () => {
  let component = {} as RenderResult

  beforeEach(() => {
    component = render(<Default />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
