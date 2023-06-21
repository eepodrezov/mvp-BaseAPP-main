import withReactQuery from '@/app/providers/with-react-query'
import { User } from '@/entities/viewer/lib'
import { viewerAtom } from '@/entities/viewer/model'
import { render, server, RenderResult, fireEvent, renderHook, waitFor } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useUpdateAtom } from 'jotai/utils'
import * as stories from './change-private-info.stories'

const { Default } = composeStories(stories)

describe('ChangePrivateInfo Tests', () => {
  const WithProviders = withReactQuery(Default)
  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement> =
    beforeEach(() => {
      server.listen()
    })
  it('ChangePrivateInfo should be render', () => {
    component = render(<WithProviders />)
    expect(component.container).toBeInTheDocument()
  })
  it('Private Info field phone should be work', () => {
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    viewer.current({ id: 1, email: 'test@mail.ru', isEmailConfirmed: true, telegram: 'telegram' } as User)
    component = render(<WithProviders />)
    expect(component.getByTestId('edit-field-edit-button')).toBeInTheDocument()
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    fireEvent.change(component.getByTestId('input'), {
      target: { value: '79999999999' },
    })

    fireEvent.click(component.getByTestId('editable-field-submit-icon'))
    waitFor(() => expect(component.getByTestId('edit-field-edit-button')).not.toBeInTheDocument())
  })
  it('Private Info field email should be work', () => {
    const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
    viewer.current({ id: 1, phone: '79999999999', isPhoneConfirmed: true, telegram: 'telegram' } as User)
    const component = render(<WithProviders />)
    expect(component.getByTestId('edit-field-edit-button')).toBeInTheDocument()
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    fireEvent.change(component.getByTestId('input'), {
      target: { value: 'test@mail.ru' },
    })

    fireEvent.click(component.getByTestId('editable-field-submit-icon'))
    waitFor(() => expect(component.getByTestId('edit-field-edit-button')).not.toBeInTheDocument())
  })
  // it('Private Info field telegram should be work', () => {
  //   const { result: viewer } = renderHook(() => useUpdateAtom(viewerAtom))
  //   viewer.current({ id: 1, email: 'test@mail.ru', phone: '79999999999' } as User)
  //   const component = render(<WithProviders />)
  //   expect(component.getByTestId('edit-field-edit-button')).toBeInTheDocument()
  //   fireEvent.click(component.getByTestId('edit-field-edit-button'))
  //   fireEvent.change(component.getByTestId('input'), {
  //     target: { value: 'telergam' },
  //   })

  //   fireEvent.click(component.getByTestId('editable-field-submit-icon'))
  //   waitFor(() => expect(component.getByTestId('edit-field-edit-button')).not.toBeInTheDocument())
  // })
})
