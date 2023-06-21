import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { CarGenerationSelect } from './car-generation-select'

export default {
  title: 'Entities/Car/CarGenerationSelect',
  component: CarGenerationSelect,
} as Meta

const Template: Story<PropsWithClassName> = args => <CarGenerationSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
