import { render, fireEvent, renderHook, screen, waitFor } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './editable-field.stories'
import { useState } from 'react'

const { InputType, SelectType, PhoneType } = composeStories(stories)

describe('EditableFieldTests', () => {
  it('label should be render', () => {
    const component = render(<InputType />)
    expect(component.getByText('Header')).toBeInTheDocument()
  })

  it('EditableField edit and cancel button should work', () => {
    const component = render(<InputType />)
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    const cancelButton = component.getByText('cancel')
    expect(cancelButton).toBeInTheDocument()
    const children = component.getByTestId('edit-field-children')
    expect(children).toBeInTheDocument()
    fireEvent.click(cancelButton)
    expect(cancelButton).not.toBeInTheDocument()
    expect(children).not.toBeInTheDocument()
  })

  it('EditableField value should render', () => {
    const component = render(<InputType value='editable-field-value' isEditable />)
    expect(component.getByText('editable-field-value')).toBeInTheDocument()
  })

  it('EditableField submit should work', async () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState('')
      return { value, setValue }
    })
    render(<InputType value={result.current.value} onChange={value => result.current.setValue(value as string)} />)
    fireEvent.click(screen.getByTestId('edit-field-edit-button'))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' },
    })
    const submitButton = screen.getByTestId('editable-field-submit-icon')
    fireEvent.click(submitButton)
    expect(result.current.value).toBe('test')
    fireEvent.click(screen.getByTestId('edit-field-edit-button'))
    expect(screen.getByTestId('edit-field-children')).toBeInTheDocument()
    expect(submitButton).not.toBeInTheDocument()
  })
  it('EditableField select value sould render', async () => {
    const component = render(<SelectType value={1} />)
    expect(component.getByText('Durwakld Reynolds')).toBeInTheDocument()
  })
  it('EditableField select value sould work', async () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(0)
      return { value, setValue }
    })
    render(<SelectType value={result.current.value} onChange={value => result.current.setValue(value as number)} />)
    fireEvent.click(screen.getByTestId('edit-field-edit-button'))
    fireEvent.click(screen.getAllByRole('button')[1])
    fireEvent.click(screen.getAllByTestId('rc-select-item-option')[0])
    fireEvent.click(screen.getByTestId('editable-field-submit-icon'))
    expect(result.current.value).toBe(1)
  })
  it('EditableField email without form should work', async () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState('')
      return { value, setValue }
    })
    const component = render(
      <InputType
        storyType='email'
        isEditable
        fieldWithoutForm
        onChange={value => result.current.setValue(value as string)}
        value={result.current.value}
        errorMessage='Invalid mail'
      />
    )
    expect(component.getByTestId('edit-field-edit-button')).toBeInTheDocument()
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test' },
    })
    fireEvent.blur(component.getByTestId('editable-wrapper'))
    expect(component.getByText('Invalid mail')).toBeInTheDocument()
    expect(component.getByTestId('save-button')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test@mail.ru' },
    })
    expect(component.getByTestId('save-button')).not.toBeDisabled()
    fireEvent.click(component.getByTestId('save-button'))
    expect(result.current.value).toBe('test@mail.ru')
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    fireEvent.blur(component.getByTestId('editable-wrapper'))
    waitFor(() => expect(result.current.value).toBe('test@mail.ru'))
  })
  it('EditableField phone without form should work', async () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState('')
      return { value, setValue }
    })
    const component = render(
      <PhoneType onChange={value => result.current.setValue(value as string)} value={result.current.value} />
    )
    expect(component.getByTestId('edit-field-edit-button')).toBeInTheDocument()
    fireEvent.click(component.getByTestId('edit-field-edit-button'))
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: '79999' },
    })
    fireEvent.blur(component.getByTestId('editable-wrapper'))
    expect(component.getByText('Invalid Phone')).toBeInTheDocument()
    expect(component.getByTestId('save-button')).toBeDisabled()
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: '79999999999' },
    })
    waitFor(() => expect(component.getByTestId('save-button')).not.toBeDisabled())
    fireEvent.click(component.getByTestId('save-button'))
    waitFor(() => expect(result.current.value).toBe('79999999999'))
  })
})
