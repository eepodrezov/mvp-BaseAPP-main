export type PasswordRecoveryUsernameForm = {
  username: string
}

export type PasswordRecoveryPasswordsForm = {
  newPassword: string
  repeatPassword: string
  code?: string
  email?: string
  phone?: string
}
