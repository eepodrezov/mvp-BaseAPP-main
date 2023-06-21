import { fireEvent, render, waitFor } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './button-social.stories'
import mockRouter from 'next-router-mock'
import singletonRouter from 'next/router'

const { Default } = composeStories(stories)

describe('ButtonSocialTests', () => {
  it('instagram button should be render', () => {
    const component = render(<Default type='instagram' />)
    expect(component.container).toBeInTheDocument()
  })
  it('facebook button should be render', () => {
    const component = render(<Default type='facebook' />)
    expect(component.container).toBeInTheDocument()
  })
  it('twitter button should be render', () => {
    const component = render(<Default type='twitter' />)
    expect(component.container).toBeInTheDocument()
  })
  it('linkedin button should be render', () => {
    const component = render(<Default type='linkedin' />)
    expect(component.container).toBeInTheDocument()
  })
  it('button should be disabled', () => {
    const component = render(<Default type='instagram' disabled />)
    fireEvent.click(component.getByRole('button'))
    expect(singletonRouter.pathname).toBe('')
  })
  it('button click and should be switch url', () => {
    const component = render(<Default type='instagram' link='test' />)
    mockRouter.setCurrentUrl('/')
    expect(singletonRouter.pathname).toBe('/')
    fireEvent.click(component.getByRole('button'))
    waitFor(() => expect(singletonRouter).toMatchObject({ pathname: '/test' }))
  })
})
