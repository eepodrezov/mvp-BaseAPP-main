import { renderWithProviders as render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './info-row.stories'
import { mock } from 'mockjs'

const { Default } = composeStories(stories)

describe('InfoRowTests', () => {
  it('InfoRownRow props should be render', () => {
    const title = mock('@title(4)')
    const text = mock('@title(4)')
    const component = render(<Default title={title} text={text} />)
    expect(component.getByText(title)).toBeInTheDocument()
    expect(component.getByText(text)).toBeInTheDocument()
  })
})
