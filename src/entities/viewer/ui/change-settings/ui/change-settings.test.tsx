import withReactQuery from '@/app/providers/with-react-query'
import { viewerAtom, User } from '@/entities/viewer'
import { render, renderHook, server, waitFor, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useUpdateAtom } from 'jotai/utils'
import { act } from 'react-dom/test-utils'
import * as stories from './change-settings.stories'

const { Default } = composeStories(stories)

describe('ChangeSettings Tests', () => {
  beforeEach(() => {
    server.listen()
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    viewer.current({ id: 1, email: 'test@mail.ru' } as User)
  })
  it('ChangeSettings should be render', () => {
    const WithProviders = withReactQuery(Default)
    const component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
  it('Switch should be work', async () => {
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    const WithProviders = withReactQuery(Default)
    const component = render(<WithProviders />)
    await waitFor(() => expect(component.getByTestId('email')).not.toBeDisabled())
    await waitFor(() => expect(component.getByTestId('telegram')).toBeDisabled())
    await component.getByTestId('telegram').focus()
    await waitFor(() => expect(screen.getByText('Connect account')).toBeInTheDocument())
    await waitFor(() => expect(component.getByTestId('sms')).toBeDisabled())
    await component.getByTestId('sms').focus()
    await waitFor(() => expect(screen.getByText('Connect account')).toBeInTheDocument())
    act(() => viewer.current({ id: 1, telegram: 'test@mail.ru' } as User))
    await waitFor(() => expect(component.getByTestId('email')).toBeDisabled())
    await component.getByTestId('email').focus()
    await waitFor(() => expect(screen.getByText('Connect account')).toBeInTheDocument())
    await waitFor(() => expect(component.getByTestId('telegram')).not.toBeDisabled())
    await waitFor(() => expect(component.getByTestId('sms')).toBeDisabled())
    act(() => viewer.current({ id: 1, phone: '89604580489' } as User))
    await waitFor(() => expect(component.getByTestId('email')).toBeDisabled())
    await waitFor(() => expect(component.getByTestId('telegram')).toBeDisabled())
    await waitFor(() => expect(component.getByTestId('sms')).not.toBeDisabled())
    // TODO: дописать тест на onChange когда будет решено что делать после успешного изменения
  })
})
