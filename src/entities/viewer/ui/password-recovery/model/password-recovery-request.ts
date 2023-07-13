import { queryFetchFactory } from '@/shared/lib'
import { PASSWORD_RECOVERY_REQUEST_TARGET, PasswordRecoveryPasswordsForm, PasswordRecoveryUsernameForm } from '../lib'
import { CURRENT_VIEWER_RESET_PASSWORD_TARGET } from '@/entities/viewer'
import { PHONE_REG_EXP } from '@/shared/config'
import { getObjectWithoutEmptyProperty } from '@/shared/helpers'

export const queryFetchPasswordRecoveryUsername = (username: string) =>
  queryFetchFactory<{ message: string }, PasswordRecoveryUsernameForm>(PASSWORD_RECOVERY_REQUEST_TARGET, {
    method: 'POST',
    data: {
      ...(PHONE_REG_EXP.test(username) ? { phone: username } : { email: username }),
    },
  })

export const queryFetchPasswordRecoveryPasswords = (
  newPassword: string,
  repeatPassword: string,
  code?: string,
  email?: string,
  phone?: string
) =>
  queryFetchFactory<PasswordRecoveryPasswordsForm>(CURRENT_VIEWER_RESET_PASSWORD_TARGET, {
    method: 'PUT',
    data: getObjectWithoutEmptyProperty({ newPassword, repeatPassword, code, email, phone }),
  })
