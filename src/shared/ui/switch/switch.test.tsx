import { fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { act } from 'react-dom/test-utils'
import * as stories from './switch.stories'

const { Default, Disabled, WithLabel } = composeStories(stories)

describe('SwitchTests', () => {
  it('switch should be render', () => {
    render(<Default />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('switch should be change checked on click', () => {
    render(<Default />)
    const switchComponent = screen.getByRole('switch')
    expect(switchComponent).not.toBeChecked()
    act(() => {
      fireEvent.click(switchComponent)
    })
    expect(switchComponent).toBeChecked()
  })

  it('disabled switch should not be change checked on click', () => {
    render(<Disabled />)
    const switchComponent = screen.getByRole('switch')
    expect(switchComponent).not.toBeChecked()
    act(() => {
      fireEvent.click(switchComponent)
    })
    expect(switchComponent).not.toBeChecked()
  })

  it('switch with label should render label', () => {
    render(<WithLabel />)
    expect(screen.getByRole('switch', { name: 'Storybook-switch' })).toBeInTheDocument()
  })

  it('switch with label should render label with styles', () => {
    render(<WithLabel labelClassName='text-red' />)
    expect(screen.getByText('Storybook-switch')).toHaveClass('text-red')
  })

  it('switch should render wrapper with styles', () => {
    render(<Default wrapperClassName='justify-content' />)
    expect(screen.getByTestId('switch-wrapper')).toHaveClass('justify-content')
  })
})
