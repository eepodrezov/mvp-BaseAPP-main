import { useModalState } from '@/shared/hooks'
import { useTranslate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { signInModalAtom } from '../model'
import { BasicAuthForm } from './basic-auth-form'

export default {
  title: 'Features/AuthForm',
  component: BasicAuthForm,
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(signInModalAtom)
  const { t } = useTranslate(['common'])
  return (
    <>
      <Button onClick={onOpen}>{t('Sign In')}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <BasicAuthForm {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
