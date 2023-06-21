import { atomWithStorageFactory } from '@/shared/lib'

export const signInModalAtom = atomWithStorageFactory('auth', false, { storageType: 'hash' })
