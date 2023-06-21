import { Story, Meta } from '@storybook/react'
import { PhotoPlug, PhotoPlugProps } from './photo-plug'

export default {
  title: 'Shared/PhotoPlug',
  component: PhotoPlug,
} as Meta

const Template: Story<PhotoPlugProps> = args => <PhotoPlug {...args} />

export const Default = Template.bind({})
Default.args = {}
