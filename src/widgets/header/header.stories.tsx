import { CallbackForm, callbackModalAtom, viewerAtom } from '@/entities/viewer'
import { BasicAuthForm, signInModalAtom } from '@/features'
import { useModalState } from '@/shared/hooks'
import { Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { Header } from './header'

export default {
  title: 'Widgets/Header',
  component: Header,
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
  const { isOpen: isOpenCallbackModal, onClose: onCloseCallbackModal } = useModalState(callbackModalAtom)
  const { isOpen: isOpenSignInModal, onClose: onCloseSignInModal } = useModalState(signInModalAtom)
  return (
    <>
      <Header {...args} />
      <Modal isOpen={isOpenCallbackModal} onClose={onCloseCallbackModal}>
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
