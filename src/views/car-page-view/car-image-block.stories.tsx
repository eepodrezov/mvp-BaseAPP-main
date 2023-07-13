import { Story, Meta } from '@storybook/react'
import { CarPageImagesBlock, CarPageImagesBlockProps } from './car-page-images-block'
import { mock } from 'mockjs'
import { CAR_ENTITY_MOCK } from '@/shared/config'

export default {
  title: 'Views/Car/CarPageImagesBlock',
  component: CarPageImagesBlock,
  args: {
    images: mock(CAR_ENTITY_MOCK).images,
  },
} as Meta

const Template: Story<CarPageImagesBlockProps> = args => {
  return <CarPageImagesBlock {...args} />
}

export const Default = Template.bind({})
Default.args = {}
