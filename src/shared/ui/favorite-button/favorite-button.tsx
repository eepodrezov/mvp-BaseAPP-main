import { ButtonHTMLAttributes, FC, useEffect, useState, MouseEvent } from 'react'
import Heart from '@/shared/assets/icons/common/heart.svg'
import cn from 'classnames'
import { useTranslate } from '@/shared/lib'
import { Button } from '../button'

export interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite?: boolean
  isSmallIcon?: boolean
  successMessage?: string
  withText?: boolean
  iconClassName?: string
  textClassName?: string
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite,
  successMessage,
  withText,
  textClassName,
  iconClassName,
  isSmallIcon,
  ...rest
}) => {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslate(['car'])
  const [favorite, setFavorite] = useState(isFavorite)

  useEffect(() => {
    setFavorite(isFavorite)
    setLoading(false)
  }, [isFavorite])

  const onClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setLoading(true)
    rest.onClick?.(e)
    setFavorite(prev => !prev)
  }

  return (
    <Button
      variant='text'
      onClick={onClick}
      childrenClassName='flex justify-center items-center gap-small'
      disabled={loading && !rest.disabled}
      {...rest}
    >
      <Heart
        data-testid='favorite-icon'
        className={cn('transition-[fill] stroke-currentColor', iconClassName, {
          'fill-red stroke-red hover:brightness-125': favorite,
          'fill-transparent': !favorite,
          'w-6': isSmallIcon,
          'w-[31px]': !isSmallIcon,
        })}
      />
      {withText && (
        <p className={cn('source-secondary-title', textClassName)}>{favorite ? t('inFavorite') : t('addToFavorite')}</p>
      )}
    </Button>
  )
}
