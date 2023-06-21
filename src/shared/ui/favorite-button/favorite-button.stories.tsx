import { Story, Meta } from '@storybook/react'
import { FavoriteButton, FavoriteButtonProps } from './favorite-button'

export default {
  title: 'Shared/FavoriteButton',
  component: FavoriteButton,
} as Meta

const Template: Story<FavoriteButtonProps> = args => <FavoriteButton {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithText = Template.bind({})
WithText.args = {
  withText: true,
}
