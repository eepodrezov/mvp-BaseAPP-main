import { addBaseDataURL } from '@/app/mocks-server/helpers'
import withNotification from '@/app/providers/with-notification'
import withReactQuery from '@/app/providers/with-react-query'
import { fireEvent, render, server, waitFor, screen, renderHook } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useAtomValue } from 'jotai'
import { rest } from 'msw'
import { CURRENT_VIEWER_CALLBACK_REQUEST_TARGET } from '../../lib'
import { callbackModalAtom } from '../../model'
import * as stories from './callback-form.stories'

const { Default } = composeStories(stories)

describe('CallbackFormTests', () => {
  beforeAll(() => {
    server.listen()
  })
  it('callback form should be render', () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
  it('modal should be render click button and close modal if click cancel button', () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    const { result: modalResult } = renderHook(() => useAtomValue(callbackModalAtom))
    fireEvent.click(component.getAllByRole('button')[0])
    expect(modalResult.current).toEqual(true)
    fireEvent.click(component.getByTestId('closeButton'))
    expect(modalResult.current).toEqual(false)
  })
  it('form and notify should be work', async () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'phone' }), {
      target: { value: '77777777777' },
    })
    await waitFor(() => expect(component.queryByTestId('submitButton')).toBeDisabled())
    fireEvent.change(component.getByTestId('textarea'), {
      target: { value: 'comment' },
    })
    await waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    expect(screen.queryByText(/validPhone/i)).not.toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('callbackNotify')).toBeInTheDocument())
    expect(screen.queryByText('serverErrorMessage')).not.toBeInTheDocument()
  })
  it('form input has error if incorrect value', async () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'phone' }), {
      target: { value: '8999999999' },
    })
    await waitFor(() => expect(screen.queryByText(/validPhone/i)).toBeInTheDocument())
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'phone' }), {
      target: { value: '79252222222' },
    })
    await waitFor(() => expect(screen.queryByText(/validPhone/i)).not.toBeInTheDocument())
  })
  it('form and notify error should be work', async () => {
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    fireEvent.change(component.getByRole('textbox', { name: 'phone' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByTestId('textarea'), {
      target: { value: 'comment' },
    })
    await waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    server.use(
      rest.post(addBaseDataURL(CURRENT_VIEWER_CALLBACK_REQUEST_TARGET), (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ error: { message: 'error' } }))
      )
    )
    await waitFor(() => expect(screen.getByText('serverErrorMessage')).toBeInTheDocument())
    expect(screen.queryByText('callbackNotify')).not.toBeInTheDocument()
  })
})
