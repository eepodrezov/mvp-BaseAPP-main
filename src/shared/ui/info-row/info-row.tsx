import { Tooltip } from '../tooltip'
import DescriptionInfoIcon from '@/shared/assets/icons/common/description-info.svg'
import cn from 'classnames'
import { TrancateContainer } from '../truncate-container'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'

export interface InfoRowProps {
  title: string
  text?: Nullable<number | string>
  subtext?: Nullable<string>
  titleStyle?: string
  textStyle?: string
  textStyleMobile?: string
  tooltipText?: string
  hasPlug?: boolean
}

export const InfoRow: FCWithClassName<InfoRowProps> = ({
  title,
  text,
  titleStyle,
  textStyle = 'source-secondary-title',
  textStyleMobile = 'source-mobile-title',
  tooltipText,
  hasPlug,
  className,
  subtext,
}) => {
  const { t } = useTranslate(['common'])
  if (!text && !hasPlug) return null
  return (
    <div className={cn('w-full flex justify-between items-center gap-small', className)}>
      <div className='flex justify-start gap-[11px]'>
        <span className={cn('text-left source-text truncate max-w-[230px]', titleStyle)}>{title}</span>
        {tooltipText && (
          <Tooltip label={tooltipText}>
            <DescriptionInfoIcon className='stroke-currentColor' />
          </Tooltip>
        )}
      </div>
      <div className='flex gap-2.5'>
        {subtext && (
          <span
            className={cn('truncate max-w-[190px]', textStyleMobile, {
              [`desktop:${textStyle}`]: textStyle,
            })}
          >
            <TrancateContainer childrenClassName='text-text source-text' maxWidth={190}>
              {subtext}
            </TrancateContainer>
          </span>
        )}
        <span
          className={cn('truncate max-w-[190px]', textStyleMobile, {
            [`desktop:${textStyle}`]: textStyle,
          })}
        >
          <TrancateContainer maxWidth={180}>{text || t('N/A')}</TrancateContainer>
        </span>
      </div>
    </div>
  )
}
