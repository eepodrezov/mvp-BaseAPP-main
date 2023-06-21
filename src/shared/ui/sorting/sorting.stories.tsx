import { SORT_DESC } from '@/shared/config'
import { useTranslate } from '@/shared/lib'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { OrderValue, Sorting, SortingProps } from './sorting'

const Template: Story<SortingProps> = args => {
  const { t } = useTranslate(['common'])
  const [value, onChange] = useState<OrderValue>({ field: 'id', order: SORT_DESC, label: t('newlyListed') })

  return <Sorting {...args} value={value} onChange={onChange} />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'Shared/Sorting',
  component: Sorting,
  args: {
    options: [
      { id: 'year', label: 'Year' },
      { id: 'mileage', label: 'Mileage' },
      { id: 'price', label: 'Price' },
    ],
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  decorators: [
    Story => (
      <div className='flex justify-center p-12'>
        <Story />
      </div>
    ),
  ],
} as Meta
