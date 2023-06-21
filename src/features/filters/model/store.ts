import { Nullable } from '@/shared/@types'
import { atom } from 'jotai'

export const filtersMobileModalAtom = atom(false)
export const lastChangedFilter = atom<Nullable<string>>(null)
