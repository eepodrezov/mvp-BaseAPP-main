import { Story, Meta } from '@storybook/react'

import { AreYouSure, AreYouSureProps } from './are-you-sure'

export default {
  title: 'Entities/Viewer/AreYouSure',
  component: AreYouSure,
} as Meta

const Template: Story<AreYouSureProps> = args => <AreYouSure {...args} />

export const Default = Template.bind({})
Default.args = {}
