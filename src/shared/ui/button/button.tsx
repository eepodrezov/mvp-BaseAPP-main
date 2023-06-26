import { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import Loading from '@/shared/assets/icons/common/loading.svg'
import Download from '@/shared/assets/icons/common/download.svg'
import { OptionalLinkWrapper } from '@/shared/lib'
import { PropsWithClassName } from '@/shared/@types'

export type Variant = 'primary' | 'secondary' | 'text' | 'icon' | 'bordered-icon' | 'text-gray' | 'download'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  fullWidth?: boolean
  childrenClassName?: string
  href?: string
  newTab?: boolean
}

export const Button = forwardRef<HTMLButtonElement, PropsWithClassName<ButtonProps>>(
  (
    { children, variant = 'primary', type = 'button', className, childrenClassName, loading, fullWidth, ...rest },
    ref
  ) => {
    return (
      <OptionalLinkWrapper {...rest} href={rest.href} isDownload={variant === 'download'}>
        <button
          ref={ref}
          className={cn(
            `group relative flex items-center justify-center min-h-[30px] rounded-xl
             disabled:text-border transition-colors disabled:cursor-not-allowed
             shadow-button active:shadow-none disabled:shadow-none outline-none`,
            className,
            {
              'text-white bg-black px-12 croogla-text desktop:enabled:hover:bg-red desktop:active:enabled:bg-black active:enabled:bg-red disabled:bg-gray':
                variant === 'primary',
              [`text-main p2 bg-transparent border desktop:enabled:border-main px-large croogla-text desktop:enabled:hover:text-red active:enabled:text-red desktop:enabled:hover:border-red
              desktop:active:enabled:text-black desktop:active:enabled:border-main active:enabled:border-red disabled:border-border`]:
                variant === 'secondary' || variant === 'bordered-icon' || variant === 'download',
              'min-h-fit source-secondary-title text-black border-none shadow-none desktop:hover:enabled:text-red active:enabled:text-red desktop:active:enabled:text-black disabled:text-border':
                variant === 'text' || variant === 'icon' || variant === 'text-gray',
              'text-gray desktop:active:enabled:text-gray': variant === 'text-gray',
              'text-red shadow-none desktop:hover:enabled:text-black active:enabled:text-black desktop:active:enabled:text-red disabled:text-border':
                variant === 'icon',
              'w-10 min-h-[40px] px-0': variant === 'bordered-icon',
              'source-mobile-text main:source-text !px-[20px]': variant === 'download',
              'pointer-events-none': loading,
              'w-full px-0': fullWidth,
            }
          )}
          type={type}
          {...rest}
        >
          {
            <Loading
              data-testid='loading-button-icon'
              className={cn('absolute animate-spin w-[29px] h-[29px] group-disabled:fill-border', {
                'fill-white': variant === 'primary',
                'fill-black':
                  variant === 'secondary' ||
                  variant === 'text' ||
                  variant === 'bordered-icon' ||
                  variant === 'icon' ||
                  variant === 'download',
                'w-[23px] h-[23px]': variant === 'bordered-icon' || variant === 'icon',
                hidden: !loading,
              })}
            />
          }
          <span
            className={cn('transition-opacity', childrenClassName, {
              'opacity-0': loading,
              'flex justify-between w-full': variant === 'download',
            })}
          >
            {children}
          </span>
          {variant === 'download' && !loading && <Download className='stroke-currentColor' width={20} height={20} />}
        </button>
      </OptionalLinkWrapper>
    )
  }
)
