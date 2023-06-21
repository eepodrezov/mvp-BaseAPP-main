import * as yup from 'yup'

export const validateEmail = (email: string | undefined) => {
  return yup.string().email().isValidSync(email)
}

export const validatePhone = (phone: number | undefined) => {
  return yup
    .number()
    .integer()
    .positive()
    .test(phone => !!(phone && phone.toString().length === 11))
    .isValidSync(phone)
}
