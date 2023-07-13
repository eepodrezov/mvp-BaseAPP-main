import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarMaterialPalette } from './car-material-palette'

export default {
  title: 'Entities/Car/CarMaterialPalette',
  component: CarMaterialPalette,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarMaterialPalette {...args} />

export const Default = Template.bind({})
Default.args = {}
