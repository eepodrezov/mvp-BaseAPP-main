import { atom } from 'jotai'
import { Steps, User } from '@/entities/viewer'
import { atomWithReset } from 'jotai/utils'
import { atomWithStorageFactory } from '@/shared/lib'

export const viewerAtom = atom<User | undefined>(undefined)
export const AreYouSureModalAtom = atom(false)
export const HasValuesChangedAtom = atom(false)
export const stepOrderAtom = atomWithReset<Steps>(1)
export const userDocumentDataModalAtom = atomWithStorageFactory('user-document-modal', false, { storageType: 'hash' })
export const callbackModalAtom = atom(false)
