import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { ColorPalette, ColorPaletteProps } from './color-palette'

export default {
  title: 'Shared/ColorPalette',
  component: ColorPalette,
  args: {
    colors: [
      { id: 1, name: 'Blue', hex: '#4285F4' },
      { id: 2, name: 'Blue', hex: '#4285F4' },
      { id: 3, name: 'Blue', hex: '#4285F4' },
      { id: 4, name: 'Blue', hex: '#4285F4' },
      { id: 5, name: 'Blue', hex: '#4285F4' },
      { id: 6, name: 'Blue', hex: '#4285F4' },
    ],
  },
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
