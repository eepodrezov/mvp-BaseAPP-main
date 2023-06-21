import { atom } from 'jotai'
import { NotificationProps } from '../notification'

export type NotificationModalData = Pick<NotificationProps, 'payload' | 'status'> & {
  onAfterClose?: () => void
}

export const notificationModalData = atom<NotificationModalData>({
  status: 'info',
  payload: '',
})
