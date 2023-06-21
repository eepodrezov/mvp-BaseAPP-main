import { viewerAtom } from '@/entities/viewer'
import { FAVORITE_CAR_ENTITY_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { FavoriteCarCard, FavoriteCarCardProps } from './favorite-car-card'

export default {
  title: 'Entities/car/FavoriteCarCard',
  component: FavoriteCarCard,
  args: { favoriteCar: mock(FAVORITE_CAR_ENTITY_MOCK) },
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

const Template: Story<FavoriteCarCardProps> = args => <FavoriteCarCard {...args} />

export const Default = Template.bind({})
Default.args = {}
