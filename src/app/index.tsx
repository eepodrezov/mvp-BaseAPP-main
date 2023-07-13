import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import NProgress from 'nprogress'
import { withProviders } from './providers'
import { useModalState } from '@/shared/hooks'
import {
  confirmedModalAtom,
  useConfirmCode,
  serverSideConfirmCodeValidation,
  BasicAuthForm,
  Confirmed,
  confirmEmailModalAtom,
  confirmPhoneModalAtom,
  ConfirmEmail,
  ConfirmPhone,
  Registration,
  registrationModalAtom,
  signInModalAtom,
  isProfilePrivateConfirmAtom,
} from '@/features'
import { Modal } from '@/shared/ui'
import {
  viewerAtom,
  useCurrentViewer,
  logoutViewer,
  AreYouSureModalAtom,
  CallbackForm,
  callbackModalAtom,
  passwordRecoveryPasswordsModalAtom,
  passwordRecoveryUsernameModalAtom,
  PasswordRecoveryUsername,
  PasswordRecoveryPasswords,
  isPasswordRecoveryAtom,
} from '@/entities/viewer'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { getTokens, NotificationModal, notificationModalData, queryClientAtom, useTranslate } from '@/shared/lib'
import { AppPropsWithLayout, RouterQueryParams } from '@/shared/@types'
import { CAR_COLLECTION_PRIMARY_KEY, CAR_SINGLE_PRIMARY_KEY, CAR_SINGLE_URL } from '@/entities/car'
import { CallbackModal, orderCallbackModalAtom } from '@/entities/order'

NProgress.configure({ showSpinner: false })
dayjs.locale(ru)

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()
  const { code, email, isProfilePrivateConfirmed, isPasswordRecovery } = router.query as RouterQueryParams
  const setViewer = useUpdateAtom(viewerAtom)
  const { t } = useTranslate(['common'])

  const { isOpen: isOpenCallbackModal, onClose: onCloseCallbackModal } = useModalState(callbackModalAtom)
  const { isOpen: isOpenSignInModal, onClose: onCloseSignInModal } = useModalState(signInModalAtom)
  const { isOpen: isOpenRegistrationModal, onClose: onCloseRegistrationModal } = useModalState(registrationModalAtom)
  const { isOpen: isOpenConfirmEmailModal, onClose: onCloseConfirmEmailModal } = useModalState(confirmEmailModalAtom)
  const { isOpen: isOpenConfirmPhoneModal } = useModalState(confirmPhoneModalAtom)
  const { onOpen: onOpenSure } = useModalState(AreYouSureModalAtom)
  const { isOpen: isOpenCallback, onClose: onCloseCallback } = useModalState(orderCallbackModalAtom)
  const {
    isOpen: isOpenConfirmedModal,
    onClose: onCloseConfirmedModal,
    onOpen: onOpenConfirmedModal,
  } = useModalState(confirmedModalAtom)
  const { isOpen: isOpenPasswordRecoveryUsername, onClose: onClosePasswordRecoveryUsername } = useModalState(
    passwordRecoveryUsernameModalAtom
  )
  const {
    isOpen: isOpenPasswordRecoveryPasswords,
    onOpen: onOpenPasswordRecoveryPasswords,
    onClose: onClosePasswordRecoveryPasswords,
  } = useModalState(passwordRecoveryPasswordsModalAtom)
  const setIsProfilePrivateConfirm = useUpdateAtom(isProfilePrivateConfirmAtom)
  const setIsPasswordRecovery = useUpdateAtom(isPasswordRecoveryAtom)
  const setNotificationModalData = useUpdateAtom(notificationModalData)
  const viewer = useAtomValue(viewerAtom)
  const queryClient = useAtomValue(queryClientAtom)

  useCurrentViewer({
    enabled: !!getTokens()?.refresh_token,
    retry: false,
    onSuccess: setViewer,
    onError: () => {
      logoutViewer(setViewer)
    },
  })

  const { mutate } = useConfirmCode({
    onSuccess: () => onOpenConfirmedModal(),
    onError: error => serverSideConfirmCodeValidation(t, error, setNotificationModalData, true),
    onSettled: () => {
      router.replace('/', undefined, { shallow: true })
    },
  })

  useEffect(() => {
    router.events.on('routeChangeStart', NProgress.start)
    router.events.on('routeChangeComplete', NProgress.done)
    router.events.on('routeChangeError', NProgress.done)
    return () => {
      router.events.off('routeChangeStart', NProgress.start)
      router.events.off('routeChangeComplete', NProgress.done)
      router.events.off('routeChangeError', NProgress.done)
    }
  }, [])
  // Подтверждение пользователя через почту
  useEffect(() => {
    // Проверка что существующий пользователь изменил почту в лк
    if (isProfilePrivateConfirmed) setIsProfilePrivateConfirm(isProfilePrivateConfirmed)
    if (isPasswordRecovery) {
      setIsPasswordRecovery(true)
      setTimeout(() => {
        onOpenPasswordRecoveryPasswords()
      }, 400)
      return
    }
    if (code && email) mutate({ code: code.replace(/["/']/g, ''), email, isRepeat: !!isProfilePrivateConfirmed })
  }, [])

  // Добавлено для измененения состояния favorite в машине
  useEffect(() => {
    if (router.pathname === '/') queryClient.invalidateQueries({ queryKey: CAR_COLLECTION_PRIMARY_KEY })
    if (router.pathname === CAR_SINGLE_URL) queryClient.invalidateQueries({ queryKey: CAR_SINGLE_PRIMARY_KEY })
  }, [viewer])

  const Layout = Component.Layout ?? (({ children }) => <>{children}</>)

  return (
    <div className='flex flex-col h-full min-h-screen'>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <Modal isOpen={isOpenCallbackModal} onClose={onCloseCallbackModal}>
          <CallbackForm />
        </Modal>
        <Modal isOpen={isOpenSignInModal} onClose={onCloseSignInModal}>
          <BasicAuthForm />
        </Modal>
        <Modal isOpen={isOpenRegistrationModal} onClose={onCloseRegistrationModal}>
          <Registration />
        </Modal>
        <Modal
          isOpen={isOpenConfirmEmailModal}
          onClose={() => [onCloseConfirmEmailModal(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
        >
          <ConfirmEmail />
        </Modal>
        <Modal isOpen={isOpenConfirmPhoneModal} onClose={onOpenSure}>
          <ConfirmPhone />
        </Modal>
        <Modal
          isOpen={isOpenConfirmedModal}
          onClose={() => [onCloseConfirmedModal(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
        >
          <Confirmed />
        </Modal>
        <Modal
          isOpen={isOpenPasswordRecoveryUsername}
          onClose={() => [onClosePasswordRecoveryUsername(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
        >
          <PasswordRecoveryUsername />
        </Modal>
        <Modal
          isOpen={isOpenPasswordRecoveryPasswords}
          onClose={() => [onClosePasswordRecoveryPasswords(), setTimeout(() => setIsPasswordRecovery(false), 300)]}
        >
          <PasswordRecoveryPasswords />
        </Modal>
        <Modal isOpen={isOpenCallback} onClose={onCloseCallback}>
          <CallbackModal />
        </Modal>
        <NotificationModal />
      </Layout>
    </div>
  )
}

export default withProviders(App)
