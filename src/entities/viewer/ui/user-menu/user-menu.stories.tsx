import { Story, Meta } from '@storybook/react'
import { ButtonHTMLAttributes } from 'react'
import { viewerAtom } from '../../model'
import { UserMenu } from './user-menu'

export default {
  title: 'Entities/Viewer/UserMenu',
  component: UserMenu,
  argTypes: {
    disabled: { control: 'boolean', defaultValue: false },
  },
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: { userName: 'Test userName' },
      },
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

const Template: Story<ButtonHTMLAttributes<HTMLButtonElement>> = args => <UserMenu {...args} />

export const Default = Template.bind({})
Default.args = {}
