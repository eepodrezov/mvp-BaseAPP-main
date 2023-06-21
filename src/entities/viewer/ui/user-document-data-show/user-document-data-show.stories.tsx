import { Story, Meta } from '@storybook/react'

import { UserDocumentDataShowProps, UserDocumentDataShow } from './user-document-data-show'

import { mock } from 'mockjs'
import { USER_DOCUMENT_MOCK } from '@/shared/config'

export default {
  title: 'Entities/Viewer/UserDocumentDataShow',
  component: UserDocumentDataShow,
  args: {
    userDocument: mock(USER_DOCUMENT_MOCK),
  },
} as Meta

const Template: Story<UserDocumentDataShowProps> = args => <UserDocumentDataShow {...args} />

export const Default = Template.bind({})
Default.args = {}
