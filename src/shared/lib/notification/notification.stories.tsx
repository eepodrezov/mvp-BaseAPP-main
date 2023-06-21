import { Story, Meta } from '@storybook/react'
import { Notification, NotificationProps } from './notification'

export default {
  title: 'Shared/Notification',
  component: Notification,
} as Meta

const Template: Story<NotificationProps> = args => (
  <div className='Toastify'>
    <div className='Toastify__toast-container'>
      <div className='Toastify__toast'>
        <div className='Toastify__toast-body'>
          <div>
            <Notification {...args} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const Success = Template.bind({})
Success.args = {
  status: 'success',
  payload: 'Information that describes something',
}

export const Info = Template.bind({})
Info.args = {
  status: 'info',
  payload: 'Information that describes something',
}

export const Error = Template.bind({})
Error.args = {
  status: 'error',
  payload: 'Information that describes the error',
}
