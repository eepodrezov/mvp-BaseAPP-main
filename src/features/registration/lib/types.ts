export type RequestRegistrationTypes = {
  username: string
  firstName: string
  lastName: string
  middleName: string
  plainPassword: string
  userAgreementConfirmation?: boolean
  repeatPassword?: string
  fingerprint?: string
}
