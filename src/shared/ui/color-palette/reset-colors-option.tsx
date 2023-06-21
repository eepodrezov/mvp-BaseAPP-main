import { FC } from 'react'
import { useTranslate } from '@/shared/lib'
import ResetPalette from '@/shared/assets/icons/common/reset-palette.svg'

export interface ResetColorsOptionProps {
  onChange: () => void
}

export const ResetColorsOption: FC<ResetColorsOptionProps> = ({ onChange }) => {
  const { t } = useTranslate(['common'])

  return (
    <div
      data-testid='reset-colors-option'
      className='group flex items-center gap-base cursor-pointer'
      onClick={onChange}
    >
      <ResetPalette className='stroke-border flex-shrink-0 group-active:stroke-black transition-colors' />
      <span className='source-text text-text group-hover:text-black group-hover:underline group-active:no-underline group-active:text-black transition-colors'>
        {t('Reset')}
      </span>
    </div>
  )
}
