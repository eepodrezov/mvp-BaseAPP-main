import { ReactElement } from 'react'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import ImportantIcon from '@/shared/assets/icons/common/money.svg'
import AttentionIcon from '@/shared/assets/icons/common/hourglass.svg'
import { FCWithClassName, PropsWithClassName } from '@/shared/@types'

export interface AttentionTextProps {
  type: 'important' | 'attention'
  text: string
}

type AttentionTextData = {
  title: string
  icon: ReactElement
}

const PANEL_DATA: Record<AttentionTextProps['type'], PropsWithClassName<AttentionTextData>> = {
  attention: {
    title: 'ATTENTION!',
    icon: <AttentionIcon className='stroke-red' />,
    className: 'text-red',
  },
  important: {
    title: 'IMPORTANT!',
    icon: <ImportantIcon className='stroke-disabled' />,
    className: 'text-disabled',
  },
}

export const AttentionText: FCWithClassName<AttentionTextProps> = ({ type, text, className }) => {
  const { t } = useTranslate(['common'])

  const data = PANEL_DATA[type]

  return (
    <div
      className={cn(
        'flex flex-col desktop:flex-row desktop:items-center gap-small desktop:gap-5 text-black',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-small source-sub-title min-h-[40px] rounded-xl bg-gray px-3 select-none w-fit',
          data.className
        )}
      >
        {data.icon} {t(data.title)}
      </div>
      <p className='source-mobile-text desktop:source-text'>{text}</p>
    </div>
  )
}
