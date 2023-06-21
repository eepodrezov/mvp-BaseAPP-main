import { atomWithStorageFactory } from '@/shared/lib'
import { atom } from 'jotai'

export const registrationModalAtom = atomWithStorageFactory('registration', false, { storageType: 'hash' })

export const registrationEmailAtom = atom('')

export const registrationPhoneAtom = atom('')
