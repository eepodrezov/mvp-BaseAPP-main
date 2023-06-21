import { Story, Meta } from '@storybook/react'
import { ShareButton, ShareButtonProps } from './share-button'

export default {
  title: 'Shared/ShareButton',
  component: ShareButton,
} as Meta

const Template: Story<ShareButtonProps> = args => <ShareButton {...args} />

export const Default = Template.bind({})
Default.args = {}
