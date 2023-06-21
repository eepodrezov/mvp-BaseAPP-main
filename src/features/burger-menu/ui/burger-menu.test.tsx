import { act, fireEvent, render, renderHook, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './burger-menu.stories'
import { useAtomValue } from 'jotai/utils'
import { callbackModalAtom } from '@/entities/viewer'

const { Default } = composeStories(stories)

describe('BurgerMenuTests', () => {
  it('burger menu should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
  it('burger menu should be render menu if click open icon and close if click close icon', () => {
    render(<Default />)
    act(() => {
      fireEvent.click(screen.getByTestId('iconOpen'))
    })
    expect(screen.queryByRole('menu')).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTestId('iconClose'))
    })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
  it('the burger menu was supposed to close at сlick button phone', async () => {
    render(<Default />)
    act(() => {
      fireEvent.click(screen.getByTestId('iconOpen'))
    })
    act(() => {
      fireEvent.click(screen.getByTestId('phoneButton'))
    })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
  it('the burger menu was supposed to close at сlick button callback', () => {
    render(<Default />)
    const { result: modalResult } = renderHook(() => useAtomValue(callbackModalAtom))
    act(() => {
      fireEvent.click(screen.getByTestId('iconOpen'))
    })
    act(() => {
      fireEvent.click(screen.getByTestId('callbackButton'))
    })
    expect(modalResult.current).toEqual(true)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
