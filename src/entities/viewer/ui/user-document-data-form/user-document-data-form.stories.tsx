import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { UserDocumentDataForm } from './user-document-data-form'
import { userDocumentDataModalAtom } from '../../model'

export default {
  title: 'Entities/Viewer/UserDocumentDataForm',
  component: UserDocumentDataForm,
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(userDocumentDataModalAtom)
  const { t } = useTranslate(['profile'])
  return (
    <>
      <Button onClick={onOpen}>{t('Fill in the data')}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <UserDocumentDataForm handleClose={onClose} {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
