import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './overview-item.stories'

const { Default } = composeStories(stories)

describe('ButtonTests', () => {
  it('overview-item props should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
    expect(component.getByText('bodyType')).toBeInTheDocument()
    expect(component.getByText('2.0 Inline-4 Turbocharged')).toBeInTheDocument()
    expect(component.getByTestId('overview-item-icon')).toBeInTheDocument()
  })
})
