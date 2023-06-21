import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './user-document-data-form.stories'
import { server } from '@/jest/utils'
import { useAtomValue } from 'jotai'

import { userDocumentDataModalAtom, stepOrderAtom } from '../../model'
import { useUpdateAtom } from 'jotai/utils'
import withNotification from '@/app/providers/with-notification'
import { USER_DOCUMENTS_TARGET } from '../../lib'
import { addBaseDataURL } from '@/app/mocks-server/helpers'
import { rest } from 'msw'
import { renderWithProviders } from '@/jest/utils'

const { Default } = composeStories(stories)

describe('PassportDataFormTests', () => {
  beforeEach(() => {
    server.listen()
  })
  it('PassportDataForm should be render', () => {
    const component = renderWithProviders(<Default />)
    expect(component.container).toBeInTheDocument()
  })

  it('modal be render click button step and back step', async () => {
    const component = renderWithProviders(<Default />)
    const { result: modalResult } = renderHook(() => useAtomValue(userDocumentDataModalAtom))
    const { result: stepResult } = renderHook(() => useAtomValue(stepOrderAtom))
    const { result } = renderHook(() => useUpdateAtom(stepOrderAtom))
    fireEvent.click(component.getByRole('button'))
    waitFor(() => expect(modalResult.current).toEqual(true))

    result.current(1)

    fireEvent.change(component.getByRole('textbox', { name: 'firstName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'middleName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'lastName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'dateBirthday *' }), {
      target: { value: '2020-01-01' },
    })
    waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    expect(stepResult.current).toEqual(1)
    fireEvent.click(component.getByTestId('submitButton'))
    waitFor(() => expect(stepResult.current).toEqual(2))
    fireEvent.click(component.getByTestId('submitButton'))
    waitFor(() => expect(stepResult.current).toEqual(3))

    fireEvent.click(component.getByTestId('submitButton'))
  })
  it('modal click button and close modal if click cancel button', () => {
    const component = renderWithProviders(<Default />)
    const { result: modalResult } = renderHook(() => useAtomValue(userDocumentDataModalAtom))
    fireEvent.click(component.getAllByRole('button')[0])
    waitFor(() => expect(modalResult.current).toEqual(true))
    fireEvent.click(component.getByTestId('closeButton'))
    waitFor(() => expect(modalResult.current).toEqual(false))
  })

  it('form and notify error should be work', async () => {
    const WithNotification = withNotification(Default)
    const component = renderWithProviders(<WithNotification />)

    fireEvent.click(component.getAllByRole('button')[0])

    fireEvent.change(component.getByRole('textbox', { name: 'lastName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'firstName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'middleName *' }), {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'dateBirthday *' }), {
      target: { value: '2020-01-01' },
    })

    waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())

    fireEvent.click(component.getByTestId('submitButton'))
    server.use(
      rest.post(addBaseDataURL(USER_DOCUMENTS_TARGET), (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ message: 'An unexpected error occurred on the server. Please wait, It will be fixed soon' })
        )
      )
    )
    waitFor(() => expect(screen.getAllByText('serverErrorMessage')[0]).toBeInTheDocument())
  })
  it('form and notify success should be work', async () => {
    const WithNotification = withNotification(Default)
    const component = renderWithProviders(<WithNotification />)

    fireEvent.click(component.getAllByRole('button')[0])

    fireEvent.change(component.getAllByTestId('input')[0], {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getAllByTestId('input')[1], {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getAllByTestId('input')[2], {
      target: { value: '77777777777' },
    })
    fireEvent.change(component.getByRole('textbox', { name: 'dateBirthday *' }), {
      target: { value: '2020-01-01' },
    })

    waitFor(() => expect(component.queryByTestId('submitButton')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('submitButton'))
    waitFor(() => expect(screen.getByText('callbackNotify')).toBeInTheDocument())
  })
})
