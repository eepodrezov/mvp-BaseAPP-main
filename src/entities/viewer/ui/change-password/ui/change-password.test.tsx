import { addBaseDataURL } from '@/app/mocks-server/helpers'
import withNotification from '@/app/providers/with-notification'
import withReactQuery from '@/app/providers/with-react-query'
import {
  CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
  CURRENT_VIEWER_ID_REQUEST_TARGET,
  User,
  viewerAtom,
} from '@/entities/viewer'
import { fireEvent, render, renderHook, server, screen, waitFor, RenderResult } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { rest } from 'msw'
import { changePasswordModalAtom } from '../model'
import * as stories from './change-password.stories'

const { Default } = composeStories(stories)

// TODO:fix render submit button and notify error
describe('ChangePassword Tests', () => {
  const WithProviders = withNotification(withReactQuery(Default))
  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>
  beforeEach(() => {
    server.listen()
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    viewer.current({ id: 1 } as User)
    component = render(<WithProviders />)
    fireEvent.click(component.getAllByRole('button')[0])
    expect(component.getByTestId('submitButton')).toBeDisabled()
    fireEvent.change(component.getAllByTestId('input')[0], {
      target: { value: 'testtest' },
    })
    fireEvent.change(component.getAllByTestId('input')[1], {
      target: { value: 'testtest' },
    })
  })
  it('form and notify should be work', async () => {
    const { result: modalResult } = renderHook(() => useAtomValue(changePasswordModalAtom))
    component = render(<WithProviders />)
    fireEvent.change(component.getAllByTestId('input')[2], {
      target: { value: 'testtesttest' },
    })
    await waitFor(() => expect(screen.queryByText(/PasswordsMustMatch/i)).toBeInTheDocument())
    await waitFor(() => expect(component.getAllByTestId('submitButton')[0]).toBeDisabled())
    fireEvent.change(component.getAllByTestId('input')[2], {
      target: { value: 'testtest' },
    })
    await waitFor(() => expect(component.getAllByTestId('submitButton')[0]).not.toBeDisabled())
    fireEvent.click(component.getAllByTestId('submitButton')[0])
    await waitFor(() => expect(screen.queryByText(/PasswordsMustMatch/i)).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Password changed successfully')).toBeInTheDocument())
    expect(modalResult.current).toEqual(false)
  })
  it('form and notify error should be work', async () => {
    component = render(<WithProviders />)
    fireEvent.change(component.getAllByTestId('input')[2], {
      target: { value: 'testtest' },
    })
    await waitFor(() => expect(component.getAllByTestId('submitButton')[0]).not.toBeDisabled())
    fireEvent.click(component.getAllByTestId('submitButton')[0])
    server.use(
      rest.put(
        addBaseDataURL(CURRENT_VIEWER_ID_REQUEST_TARGET + CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET),
        (_, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    await waitFor(() => expect(component.getAllByTestId('submitButton')[0]).not.toBeDisabled())
    await waitFor(() => expect(screen.queryByText('Password changed successfully')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getAllByText('common:serverErrorMessage')[0]).toBeInTheDocument())
  })
})
describe('form without user not be render', () => {
  it('form without user not be render', () => {
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    viewer.current(undefined)
    const WithProviders = withNotification(withReactQuery(Default))
    const component = render(<WithProviders />)
    expect(component.queryByTestId('submitButton')).not.toBeInTheDocument()
  })
})
