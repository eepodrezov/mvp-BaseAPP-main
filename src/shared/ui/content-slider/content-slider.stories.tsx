import { Story, Meta } from '@storybook/react'
import { mock, Random } from 'mockjs'
import { ContentSlider, ContentSliderProps } from './content-slider'

export default {
  title: 'Shared/ContentSlider',
  component: ContentSlider,
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

const Template: Story<ContentSliderProps> = args => (
  <div className='w-[870px]'>
    <ContentSlider {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
