import { viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { changePasswordModalAtom } from '../model'
import { ChangePassword } from './change-password'

export default {
  title: 'Entities/Viewer/ChangePassword',
  component: ChangePassword,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          id: 1,
        },
      },
    },
  },
} as Meta

const Template: Story = args => {
  const { t } = useTranslate(['profile'])
  const { isOpen, onOpen, onClose } = useModalState(changePasswordModalAtom)
  return (
    <>
      <Button variant='text' onClick={onOpen}>
        {t('Change password')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ChangePassword {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
