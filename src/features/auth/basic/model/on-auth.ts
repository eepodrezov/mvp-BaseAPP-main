import { USER_COLLECTION_PRIMARY_KEY } from '@/entities/viewer'
import { serverSideAuthValidation } from '../lib'
import { authRequest, onSubmit, setCookieTokens } from '@/shared/lib'
import { TFunction } from '@/shared/@types'
import { QueryClient } from 'react-query'
import { AxiosBasicCredentials, AxiosError } from 'axios'

export const onAuth = (
  data: AxiosBasicCredentials,
  isMobile: boolean,
  t: TFunction,
  onCloseSignInModal?: () => void,
  queryClient?: QueryClient,
  onOpenСonfirmedViewer?: (isMobile: boolean, username: string) => void
) =>
  onSubmit(data)({
    submitRequest: authRequest,
    onSuccess: (_, { data: res }) => {
      setCookieTokens(res)
      queryClient
        ?.refetchQueries({ queryKey: USER_COLLECTION_PRIMARY_KEY }, { throwOnError: true })
        .catch(err => {
          // Проверка потдверждения пользователя
          const error = err as AxiosError<any, any>
          if (error.response?.status === 403) onOpenСonfirmedViewer?.(isMobile, data.username)
        })
        .finally(() => {
          onCloseSignInModal?.()
        })
    },
    onError: err => {
      serverSideAuthValidation(t, err)
    },
  })
