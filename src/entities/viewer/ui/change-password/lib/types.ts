import { BaseEntity } from '@/shared/@types'

export type RequestChangePassword = FieldsChangePassword & Pick<BaseEntity, 'id'>

export type FieldsChangePassword = {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}
