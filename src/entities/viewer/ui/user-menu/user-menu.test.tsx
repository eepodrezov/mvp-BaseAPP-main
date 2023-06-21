import { signInModalAtom } from '@/features'
import { fireEvent, render, renderHook, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { User } from '../../lib'
import { viewerAtom } from '../../model'
import * as stories from './user-menu.stories'

const { Default } = composeStories(stories)

describe('UserMenuTests', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useUpdateAtom(viewerAtom))
    const { result: modalResult } = renderHook(() => useUpdateAtom(signInModalAtom))
    result.current(undefined)
    modalResult.current(false)
  })

  it('user menu should be render', () => {
    render(<Default />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('user menu should be render menu if user authed', () => {
    const { result } = renderHook(() => useUpdateAtom(viewerAtom))
    const { result: modalResult } = renderHook(() => useAtomValue(signInModalAtom))
    result.current({ username: 'testUserName' } as User)
    render(<Default />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(modalResult.current).toEqual(false)
  })

  it('user menu should be open uath modal if user not authed', () => {
    const { result } = renderHook(() => useAtomValue(signInModalAtom))
    render(<Default />)
    fireEvent.click(screen.getByRole('button'))
    expect(result.current).toEqual(true)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign in'))
  })
})
