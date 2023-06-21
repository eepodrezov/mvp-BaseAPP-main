import { FC } from 'react'
import ShareIcon from '@/shared/assets/icons/common/share-icon.svg'
import { useTranslate } from '@/shared/lib'
import { Button } from '../button'
import { Tooltip } from '../tooltip'
import cn from 'classnames'

export interface ShareButtonProps {
  withText?: boolean
}

export const ShareButton: FC<ShareButtonProps> = ({ withText = true }) => {
  const { t } = useTranslate(['common'])
  return (
    <Tooltip isClickable label={t('linkCopied')} placement='bottom'>
      <Button
        variant='text'
        onClick={() => typeof window != 'undefined' && navigator.clipboard.writeText(window.location.href)}
        childrenClassName='flex items-center gap-small'
      >
        <ShareIcon className='fill-currentColor' />
        <p className={cn({ hidden: !withText })}>{t('share')}</p>
      </Button>
    </Tooltip>
  )
}
