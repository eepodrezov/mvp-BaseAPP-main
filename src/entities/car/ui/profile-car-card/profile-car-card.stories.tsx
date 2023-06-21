import { viewerAtom } from '@/entities/viewer'
import { CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { ProfileCarCard, ProfileCarCardProps } from './profile-car-card'

export default {
  title: 'Entities/car/ProfileCarCard',
  component: ProfileCarCard,
  args: { car: mock(CAR_ENTITY_MOCK) },
  parameters: {
    jotai: {
      atoms: {
        user: viewerAtom,
      },
      values: {
        user: {
          id: 1,
        },
      },
    },
  },
} as Meta

const Template: Story<ProfileCarCardProps> = args => <ProfileCarCard {...args} />

export const Default = Template.bind({})
Default.args = {}
