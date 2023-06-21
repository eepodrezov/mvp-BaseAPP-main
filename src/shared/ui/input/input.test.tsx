import { render, fireEvent } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './input.stories'

const { Default, DefaultPhone } = composeStories(stories)

describe('InputTests', () => {
  it('input should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
  it('input-label should change position ', async () => {
    const component = render(<Default />)
    expect(component.getByTestId('input-label')).toHaveClass('invisible')
    await component.getByRole('textbox').focus()
    expect(component.getByTestId('input-label')).not.toHaveClass('invisible')
    await component.getByRole('textbox').blur()
    expect(component.getByTestId('input-label')).toHaveClass('invisible')
  })
  it('input focus style should be work', async () => {
    const component = render(<Default />)
    const inputContainer = component.getByTestId('input-container')
    const input = component.getByTestId('input')
    expect(inputContainer).toHaveClass('border-border')
    fireEvent.focus(input)
    expect(inputContainer).toHaveClass('!border-black')
    expect(inputContainer).not.toHaveClass('!border-border')
    fireEvent.blur(input)
    expect(inputContainer).toHaveClass('border-border')
  })

  it('error input style should work', () => {
    const component = render(<Default error />)
    const inputErrorFocusStyles = 'group-hover:text-black focus:text-red caret-red'
    expect(component.getByTestId('input-container')).toHaveClass('!border-red')
    fireEvent.click(component.getByRole('textbox'))
    expect(component.getByRole('textbox')).toHaveClass(inputErrorFocusStyles)
  })

  it('input is error', () => {
    const component = render(<Default error errorMessage='test' />)
    expect(component.getByText(/test/i)).toBeInTheDocument()
  })
  it('input password should be work', async () => {
    const component = render(<Default type='password' />)
    const input = component.getByTestId('input')
    expect(input).toHaveAttribute('type', 'password')
    await fireEvent.click(component.getByTestId('eye-button'))
    expect(input).toHaveAttribute('type', 'text')
  })
  it('input works', () => {
    const component = render(<Default />)
    expect(component.queryByText(/test/i)).toBeNull()
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test' },
    })
    expect(component.getByDisplayValue(/test/i)).toBeInTheDocument()
  })

  it('passwordStrength ', async () => {
    const component = render(<Default type='password' passwordStrength />)
    fireEvent.click(component.getByTestId('eye-button'))
    const input = component.getByRole('textbox')
    fireEvent.change(input, {
      target: { value: 'testtest' },
    })

    expect(component.getByText(/password/)).toHaveClass('text-red')

    await fireEvent.change(input, {
      target: { value: 'testtttT' },
    })

    expect(component.getByText(/password/)).toHaveClass('text-orange')
    await fireEvent.change(input, {
      target: { value: 'testtttTTTT' },
    })
    expect(component.getByText(/password/)).toHaveClass('text-green')
  })
  it('phone input mask should be work', async () => {
    const component = render(<DefaultPhone type='tel' />)
    expect(component.getByRole('textbox')).toHaveDisplayValue('')
    fireEvent.click(component.getByRole('textbox'))
    await fireEvent.change(component.getByRole('textbox'), {
      target: { value: '79990103131' },
    })
    expect(component.getByRole('textbox')).toHaveDisplayValue('+7 (999)-010-31-31')
  })
  it('phone input mask should not accept symbols', async () => {
    const component = render(<DefaultPhone type='tel' />)
    expect(component.getByRole('textbox')).toHaveDisplayValue('')
    fireEvent.click(component.getByRole('textbox'))
    await fireEvent.change(component.getByRole('textbox'), {
      target: { value: 'test!+=-?/><`~' },
    })
    expect(component.getByRole('textbox')).toHaveDisplayValue('')
  })
  it('phone input-label visible ', async () => {
    const component = render(<Default type='tel' />)
    expect(component.getByTestId('input-label')).toHaveClass('invisible')
    await component.getByRole('textbox').focus()
    expect(component.getByTestId('input-label')).not.toHaveClass('invisible')
    await component.getByRole('textbox').blur()
    expect(component.getByTestId('input-label')).toHaveClass('invisible')
  })

  it('input should be work with max length value', () => {
    const component = render(<Default maxLength={4} />)
    fireEvent.click(component.getByRole('textbox'))
    fireEvent.change(component.getByRole('textbox'), {
      target: { value: '123456' },
    })
    expect(component.getByRole('textbox')).toHaveDisplayValue('1234')
  })
  it('input should be work in filters', () => {
    const component = render(<Default type='number' isFilters />)
    fireEvent.click(component.getByTestId('input'))
    fireEvent.change(component.getByTestId('input'), {
      target: { value: '0123456' },
    })
    expect(component.getByTestId('input')).toHaveDisplayValue('123456')
  })
})
