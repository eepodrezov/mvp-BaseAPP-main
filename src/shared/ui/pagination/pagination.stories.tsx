import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Pagination, PaginationProps } from './pagination'

export default {
  title: 'Shared/Pagination',
  component: Pagination,
} as Meta

const Template: Story<PaginationProps> = args => {
  const [page, setPage] = useState(1)

  //@ts-expect-error
  return <Pagination currentPage={page} totalPageCount={30} onChange={setPage} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
