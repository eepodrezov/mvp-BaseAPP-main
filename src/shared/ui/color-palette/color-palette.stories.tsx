import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { ColorPalette, ColorPaletteProps } from './color-palette'
import { COLOR_ENTITY_MOCK } from '@/shared/config'
import { mock } from 'mockjs'

export default {
  title: 'Shared/ColorPalette',
  component: ColorPalette,
  args: mock({ 'colors|6': [COLOR_ENTITY_MOCK] }),
} as Meta

const Template: Story<ColorPaletteProps> = args => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  return (
    <div className='w-[420px] p-5'>
      {/* @ts-expect-error */}
      <ColorPalette selectedIds={selectedIds} onChange={setSelectedIds} {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const WithSelectAll = Template.bind({})
WithSelectAll.args = {
  withSelectAll: true,
  selectAllLabel: 'All Exterior Color',
}
