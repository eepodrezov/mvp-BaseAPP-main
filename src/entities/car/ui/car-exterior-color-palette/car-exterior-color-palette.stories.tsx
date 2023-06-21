import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarExteriorColorPalette } from './car-exterior-color-palette'

export default {
  title: 'Entities/Car/CarExteriorColorPalette',
  component: CarExteriorColorPalette,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarExteriorColorPalette {...args} />

export const Default = Template.bind({})
Default.args = {}
