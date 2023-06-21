import { render, waitFor, fireEvent } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { Textarea } from './textarea'
import * as stories from './textarea.stories'

const { Default, WithChildren } = composeStories(stories)

describe('TextareaTests', () => {
  it('textarea should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
  it('textarea with children should be render', () => {
    const component = render(<WithChildren />)
    expect(component.container).toBeInTheDocument()
    expect(component.getAllByRole('button')[0]).toBeInTheDocument()
  })
  it('textarea-label invisible with not value', async () => {
    const component = render(<Default />)
    expect(component.getByTestId('textarea-label')).toHaveClass('invisible')
    component.getByRole('textbox').focus()
    await waitFor(() => expect(component.getByTestId('textarea-label')).not.toHaveClass('invisible'))
    component.getByRole('textbox').blur()
    await waitFor(() => expect(component.getByTestId('textarea-label')).toHaveClass('invisible'))
  })
  it('textarea focus style should be work', async () => {
    const component = render(<Default />)
    const inputContainer = component.getByTestId('textarea-container')
    const input = component.getByRole('textbox')
    expect(inputContainer).toHaveClass('border-border')
    fireEvent.focus(input)
    expect(inputContainer).toHaveClass('!border-black')
    expect(inputContainer).not.toHaveClass('!border-border')
    fireEvent.blur(input)
    expect(inputContainer).toHaveClass('border-border')
  })
  it('error textarea style should work', () => {
    const component = render(<Textarea error name='test' />)
    const inputContainer = component.getByTestId('textarea-container')
    const input = component.getByRole('textbox')
    const inputErrorFocusStyles = 'group-hover:text-black focus:text-red'
    expect(inputContainer).toHaveClass('!border-red')
    fireEvent.click(component.getByRole('textbox'))
    expect(input).toHaveClass(inputErrorFocusStyles)
  })
  it('textarea is error', () => {
    const component = render(<Textarea error errorMessage='test' name='' />)
    expect(component.getByText(/test/i)).toBeInTheDocument()
  })
  it('textarea works', () => {
    const component = render(<Default />)
    expect(component.queryByText(/test/i)).toBeNull()
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test' },
    })
    expect(component.getByDisplayValue(/test/i)).toBeInTheDocument()
  })
  it('textarea-label visible with value', async () => {
    const component = render(<Default />)
    expect(component.getByTestId('textarea-label')).toHaveClass('invisible')
    component.getByRole('textbox').focus()
    await waitFor(() => expect(component.getByTestId('textarea-label')).not.toHaveClass('invisible'))
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test' },
    })
    component.getByRole('textbox').blur()
    expect(component.getByTestId('textarea-label')).not.toHaveClass('invisible')
  })
})
