import { render, RenderResult } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './filters-reset-button.stories'

const { Default } = composeStories(stories)

describe('FiltersResetButtonTests', () => {
  let component = {} as RenderResult

  beforeEach(() => {
    component = render(<Default />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
