import { viewerAtom } from '@/entities/viewer'
import { FCWithClassName } from '@/shared/@types'
import { HEADER_COLUMNS_NAME } from '@/shared/config'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { useAtomValue } from 'jotai'
export interface ProfileCarHeaderProps {
  nameHeader?: string
  withColumns?: boolean
  headerColumns?: string[]
}

export const ProfileCarHeader: FCWithClassName<ProfileCarHeaderProps> = ({
  className,
  nameHeader,
  headerColumns = HEADER_COLUMNS_NAME,
  withColumns = true,
}) => {
  const { t } = useTranslate(['car', 'profile', 'common'])
  const viewer = useAtomValue(viewerAtom)
  if (!viewer) return null
  return (
    <div className='grid grid-cols-[290px_1fr] w-full main:pl-6 gap-[3px]'>
      <h1 className='desktop:croogla-title croogla-text text-black'>{nameHeader}</h1>
      {withColumns && (
        <div className='main:grid hidden grid-cols-[102px_82px_81px_90px_109px_146px] gap-5 text-center items-center text-text source-text'>
          {headerColumns?.map(column => (
            <p className={cn('text-text source-mobile-text', className)} key={column}>
              {t(column)}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
