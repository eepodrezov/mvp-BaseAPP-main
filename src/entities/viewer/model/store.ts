import { atom } from 'jotai'
import { Steps, User } from '@/entities/viewer'
import { atomWithReset } from 'jotai/utils'
import { atomWithStorageFactory } from '@/shared/lib'

//временная модель
export const viewerAtom = atom<User | undefined>({
  id: 0,
  isAgreementAccepted: true,
  firstName: 'Egor',
  lastName: 'Podrezov',
  middleName: 'Evgenievich',
  fullName: 'Egor Evgenievich Podrezov',
  isRealEmail: true,
  username: 'eepodrezov',
  enabled: true,
  email: 'eepodrezov@ya.ru',
  roles: ['ROLE_ADMIN','ROLE_USER'],
  phone: '89185829829',
  isExternalUser: true,
  isEmailConfirmed: true,
  isPhoneConfirmed: true,
  isTelegramConfirmed: true,
  telegram: 'eepodrezov',
  avatar:[{
    href: 'https://sun9-50.userapi.com/impg/nw43iXslqRtELGXhSuEyZP0u_WE-bl4RL3GBeg/PXFMMSw5iCc.jpg?size=960x1280&quality=95&sign=d6726b24dd385f765b57ea7240bb9754&type=album',
    id: 0,
    dateCreate: '',
    dateUpdate: '',
  }]
})
export const AreYouSureModalAtom = atom(false)
export const HasValuesChangedAtom = atom(false)
export const stepOrderAtom = atomWithReset<Steps>(1)
export const userDocumentDataModalAtom = atomWithStorageFactory('user-document-modal', false, { storageType: 'hash' })
export const callbackModalAtom = atom(false)
