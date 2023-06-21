export type RequestConfirmRegPhone = {
  code: string
}
export type RequestConfirmCodeTypes = {
  code?: string
  phone?: string
  email?: string
  newPassword?: string
  isRepeat?: boolean
}
