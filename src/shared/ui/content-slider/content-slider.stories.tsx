import { Story, Meta } from '@storybook/react'
import { mock, Random } from 'mockjs'
import { Slider, SliderProps } from './content-slider'

export default {
  title: 'Shared/Slider',
  component: Slider,
  args: mock({
    'images|15': [
      {
        'id|+1': 1,
        url: Random.image(),
      },
    ],
    slideWidth: 266,
    slideHeight: 200,
    slideBorderRadius: 20,
    spaceBetween: 20,
    shownImagesCount: 4,
  }),
} as Meta

const Template: Story<SliderProps> = args => (
  <div className='w-[870px]'>
    <Slider {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
