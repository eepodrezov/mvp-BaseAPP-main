import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './settings-tab.stories'

const { Default } = composeStories(stories)

describe('SettingsTab Tests', () => {
  it('SettingsView should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
