import { Story, Meta } from '@storybook/react'
import { Informer, InformerProps } from './informer'

export default {
  title: 'Shared/Informer',
  component: Informer,
} as Meta

const Template: Story<InformerProps> = args => <Informer {...args}>Text</Informer>

export const Default = Template.bind({})
Default.args = {}
