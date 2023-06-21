import { FC, SVGProps } from 'react'

// TODO добавить engine и segment/class, когда будут на беке
export type OverviewItemType = 'bodyType' | 'driveType' | 'fuelType' | 'transmissionType' | 'colors' | 'interiorColors'

export interface OverviewItemProps {
  type: OverviewItemType
  text: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

export const OverviewItem: FC<OverviewItemProps> = ({ type, text, Icon }) => {
  if (!text) return null
  return (
    <div className='flex gap-5 main:min-w-[270px]'>
      <Icon data-testid='overview-item-icon' className='w-10 h-10 desktop:w-[60px] desktop:h-[60px] fill-black' />
      <div className='flex flex-col gap-extra-small max-w-10 desktop:max-w-[220px]'>
        <div className='source-mobile-text desktop:source-text'>{type}</div>
        <div className='source-mobile-sub-text desktop:source-title'>{text}</div>
      </div>
    </div>
  )
}
