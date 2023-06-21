import { useModalState } from '@/shared/hooks'
import { Button, Modal } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { CallbackForm } from './callback-form'
import PhoneMenuIcon from '@/shared/assets/icons/common/phone-icon.svg'
import { useTranslate } from '@/shared/lib'
import { callbackModalAtom } from '../../model'

export default {
  title: 'Features/CallbackForm',
  component: CallbackForm,
} as Meta

const Template: Story = args => {
  const { isOpen, onClose, onOpen } = useModalState(callbackModalAtom)
  const { t } = useTranslate(['common'])
  return (
    <>
      <Button variant='secondary' childrenClassName='flex items-center gap-small' onClick={onOpen}>
        <PhoneMenuIcon className='fill-currentColor' />
        {t('callback')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <CallbackForm {...args} />
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
