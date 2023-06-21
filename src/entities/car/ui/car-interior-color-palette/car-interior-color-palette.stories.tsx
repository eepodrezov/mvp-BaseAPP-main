import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarInteriorColorPalette } from './car-interior-color-palette'

export default {
  title: 'Entities/Car/CarInteriorColorPalette',
  component: CarInteriorColorPalette,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarInteriorColorPalette {...args} />

export const Default = Template.bind({})
Default.args = {}
