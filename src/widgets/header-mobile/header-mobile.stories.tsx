import { CallbackForm, callbackModalAtom, viewerAtom } from '@/entities/viewer'
import { BasicAuthForm, signInModalAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { HeaderMobile } from './header-mobile'

export default {
  title: 'Widgets/HeaderMobile',
  component: HeaderMobile,
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          userName: 'Test userName',
        },
      },
    },
  },
} as Meta

const Template: Story = args => {
  const { isOpen, onClose } = useModalState(callbackModalAtom)
  const { isOpen: isOpenSignInModal, onClose: onCloseSignInModal } = useModalState(signInModalAtom)
  return (
    <>
      <HeaderMobile {...args} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <CallbackForm />
      </Modal>
      <Modal isOpen={isOpenSignInModal} onClose={onCloseSignInModal}>
        <BasicAuthForm />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
