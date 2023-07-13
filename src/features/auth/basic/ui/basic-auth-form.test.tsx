import { addBaseDataURL } from '@/app/mocks-server/helpers'
import withNotification from '@/app/providers/with-notification'
import withReactQuery from '@/app/providers/with-react-query'
import { fireEvent, render, renderHook, waitFor, screen, server } from '@/jest/utils'
import { AUTH_REQUEST_TARGET } from '@/shared/lib'
import { composeStories } from '@storybook/testing-react'
import { useAtomValue } from 'jotai'
import { rest } from 'msw'
import { signInModalAtom } from '../model'
import * as stories from './basic-auth-form.stories'

const { Default } = composeStories(stories)

describe('BasicAuthForm Tests', () => {
  beforeAll(() => {
    server.listen()
  })
  it('BasicAuthForm should be render', () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
  it('modal should be render click button and close modal if click cancel button', () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    const { result: modalResult } = renderHook(() => useAtomValue(signInModalAtom))
    fireEvent.click(component.getAllByRole('button')[0])
    expect(modalResult.current).toEqual(true)
    fireEvent.click(component.getByTestId('closeButton'))
    expect(modalResult.current).toEqual(false)
  })
  it('form should be work', async () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    const { result: modalResult } = renderHook(() => useAtomValue(signInModalAtom))
    fireEvent.click(component.getAllByRole('button')[0])
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'login' }), {
      target: { value: '77777777777' },
    })
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getAllByTestId('input')[1], {
      target: { value: '77777777777' },
    })
    await waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    expect(screen.queryByText(/validLogin/i)).not.toBeInTheDocument()
    await waitFor(() => expect(modalResult.current).toEqual(false))
  })
  it('form inputs has error if incorrect value', async () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'login' }), {
      target: { value: '8987878' },
    })
    //TODO разобраться и вернуть
    // waitFor(() => expect(screen.queryByText(/validLogin/i)).toBeInTheDocument())
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox', { name: 'login' }), {
      target: { value: '79252222222' },
    })
    fireEvent.change(component.getAllByTestId('input')[1], {
      target: { value: '8997878787' },
    })
    expect(screen.queryByText(/validLogin/i)).not.toBeInTheDocument()
  })
  it('form and notify error should be work', async () => {
    const WithProviders = withReactQuery(withNotification(Default))
    const component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    fireEvent.change(component.getByRole('textbox', { name: 'login' }), {
      target: { value: '79252222222' },
    })
    fireEvent.change(component.getAllByTestId('input')[1], {
      target: { value: '8997878787' },
    })
    await waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    server.use(
      rest.post(addBaseDataURL(AUTH_REQUEST_TARGET), (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ message: 'The user credentials were incorrect.' }))
      )
    )
    await waitFor(() => expect(screen.queryByText(/validLogin/i)).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('The user credentials were incorrect')).toBeInTheDocument())
  })
})
