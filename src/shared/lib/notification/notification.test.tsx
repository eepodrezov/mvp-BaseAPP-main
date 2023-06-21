import { fireEvent, render, renderWithProviders, screen, waitFor } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { notify } from './notification'
import * as stories from './notification.stories'

const { Success, Info, Error } = composeStories(stories)

describe('NotificationTests', () => {
  it('notifications should be render with correct titles and icon styles', () => {
    const { unmount } = render(<Success />)
    expect(screen.getByRole('heading', { name: 'success' })).toBeInTheDocument()
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
    unmount()
    const { unmount: unmountInfo } = render(<Info />)
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-text')
    unmountInfo()
    render(<Error />)
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-red')
  })

  it('notification should be render with custom payload', () => {
    const payload = 'custom-payload'
    render(<Success payload={payload} />)
    expect(screen.getByText(payload)).toBeInTheDocument()
  })

  it('notification should be render with custom title', () => {
    const title = 'custom-title'
    render(<Success title={title} />)
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  })

  it('notification should be render with custom icon and icon styles', () => {
    const icon = () => <svg data-testid='custom-notification-icon'></svg>

    render(<Success icon={icon} />)
    expect(screen.getByTestId('custom-notification-icon')).toBeInTheDocument()
  })
})

describe('NotifyTests', () => {
  it('notify success should be render with correct titles and icon styles ', async () => {
    renderWithProviders(<button onClick={() => notify('test', { status: 'success' })} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'success' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
  })

  it('notify info should be render with correct titles and icon styles ', async () => {
    renderWithProviders(<button onClick={() => notify('test', { status: 'info' })} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'info' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-text')
  })

  it('notify error should be render with correct titles and icon styles ', async () => {
    renderWithProviders(<button onClick={() => notify('test', { status: 'error' })} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'error' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-red')
  })

  it('notify without status should be render with correct success status ', async () => {
    renderWithProviders(<button onClick={() => notify('test')} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'success' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
  })

  it('notify should be render with custom payload', async () => {
    const payload = 'custom-payload'
    renderWithProviders(<button onClick={() => notify(payload)} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText(payload)).toBeInTheDocument())
  })

  it('notify should be render with custom title', async () => {
    const title = 'custom-title'
    renderWithProviders(
      <button
        onClick={() =>
          notify('test', {
            title,
          })
        }
      />
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: title })).toBeInTheDocument())
  })

  it('notification should be render with custom icon and icon styles', async () => {
    const icon = () => <svg data-testid='custom-notification-icon'></svg>
    renderWithProviders(
      <button
        onClick={() =>
          notify('test', {
            icon,
          })
        }
      />
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('custom-notification-icon')).toBeInTheDocument())
  })
})
