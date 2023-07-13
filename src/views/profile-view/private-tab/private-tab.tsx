import { useTranslate } from '@/shared/lib'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { Button, Informer, Modal } from '@/shared/ui'
import { useModalState } from '@/shared/hooks'
import {
  userDocumentDataModalAtom,
  UserDocumentDataForm,
  viewerAtom,
  ChangePrivateInfo,
  useUserDocumentCollection,
  UserDocumentDataShow,
  stepOrderAtom,
  AreYouSureModalAtom,
  AreYouSure,
  HasValuesChangedAtom,
} from '@/entities/viewer'
import { useResetAtom } from 'jotai/utils'

export const PrivateTab: FC = () => {
  const { t } = useTranslate(['profile'])
  const HasValuesChanged = useAtomValue(HasValuesChangedAtom)
  const { onOpen, onClose, isOpen } = useModalState(userDocumentDataModalAtom)
  const { onOpen: onOpenSure, onClose: onCloseSure, isOpen: isOpenSure } = useModalState(AreYouSureModalAtom)

  const resetFormSteps = useResetAtom(stepOrderAtom)

  function handleClose() {
    onCloseSure()
    onClose()
    // чтобы перед закрытием не успевал появиться первый шаг
    setTimeout(() => resetFormSteps(), 500)
  }

  function handleOpen() {
    if (HasValuesChanged) {
      onOpenSure()
    } else handleClose()
  }

  const { data } = useUserDocumentCollection()

  const viewer = useAtomValue(viewerAtom)
  if (!viewer) return null

  return (
    <div className='desktop:p-10 pt-large pl-5 flex flex-col gap-large desktop:gap-10'>
      <h1 className='desktop:croogla-title croogla-text text-black'>{t('Private info')}</h1>
      {(!viewer.email || !viewer.phone) && (
        <Informer>{t('You must fill in contact information so that the manager can contact you')}</Informer>
      )}
      <ChangePrivateInfo />
      <div className='flex flex-col gap-medium'>
        <p className='source-underline text-text'>{t('Passport data')}</p>
        {data?.items?.length ? (
          <UserDocumentDataShow userDocument={data.items[0]} />
        ) : (
          <>
            <Button className='w-[273px] !px-large' onClick={onOpen}>
              {t('Fill in the data')}
            </Button>
            <Modal withCloseIconInside isOpen={isOpen} onClose={handleOpen}>
              <UserDocumentDataForm handleClose={handleOpen} />
            </Modal>
            <Modal isOpen={isOpenSure} onClose={onCloseSure}>
              <AreYouSure handleClose={handleClose} onClose={onCloseSure}>
                {t('After closing the window, the completed data will not be saved')}
              </AreYouSure>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}
