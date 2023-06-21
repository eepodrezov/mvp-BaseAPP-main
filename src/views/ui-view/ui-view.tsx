import { ContentSlider } from '@/shared/ui'
import { components } from './ui-components'


export const UiView = () => {
  return (
    <div
      className="h-full w-full flex justify-center items-center"
    >
      <ContentSlider >
          {components}
      </ContentSlider>
    </div>
  )
}
