import { render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './error-page-view.stories'

const { Default } = composeStories(stories)

describe('ErrorPage component test', () => {
  it('WithClientError component and content should be render', () => {
    render(<Default errorType='client' />)
    expect(screen.getByText('clientError')).toBeInTheDocument()
    expect(screen.getByText('clientErrorMessage')).toBeInTheDocument()
  })

  it('WithServerError component and content should be render', () => {
    render(<Default errorType='server' />)
    expect(screen.getByText('serverError')).toBeInTheDocument()
    expect(screen.getByText('serverErrorMessage')).toBeInTheDocument()
  })
})
